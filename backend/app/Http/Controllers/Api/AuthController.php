<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'locale' => 'string|in:uk,pl,en',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'locale' => $validated['locale'] ?? 'uk',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Невірний email або пароль'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user->load('masterProfile'),
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Вихід виконано успішно']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user()->load('masterProfile'));
    }

    public function googleRedirect()
    {
        try {
            $driver = Socialite::driver('google')->stateless();
            $redirectUri = env('GOOGLE_REDIRECT_URI');
            if ($redirectUri) {
                $driver = $driver->redirectUrl($redirectUri);
            }

            return response()->json([
                'url' => $driver->redirect()->getTargetUrl(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Google OAuth is not configured',
            ], 500);
        }
    }

    public function googleCallback(Request $request)
    {
        try {
            $driver = Socialite::driver('google')->stateless();
            $redirectUri = env('GOOGLE_REDIRECT_URI');
            if ($redirectUri) {
                $driver = $driver->redirectUrl($redirectUri);
            }

            $googleUser = $driver->user();

            $user = User::where('email', $googleUser->email)->first();

            if (!$user) {
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'avatar' => $googleUser->avatar,
                    'email_verified_at' => now(),
                ]);
            } elseif (!$user->google_id) {
                $user->update([
                    'google_id' => $googleUser->id,
                    'avatar' => $googleUser->avatar ?? $user->avatar,
                ]);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            $frontendUrl = rtrim(env('FRONTEND_URL', 'https://svoi24.pl'), '/');
            $redirectUrl = $frontendUrl . '/auth/google/callback?token=' . urlencode($token);
            return redirect()->away($redirectUrl);
        } catch (\Exception $e) {
            $frontendUrl = rtrim(env('FRONTEND_URL', 'https://svoi24.pl'), '/');
            $redirectUrl = $frontendUrl . '/login?error=google';
            return redirect()->away($redirectUrl);
        }
    }
}

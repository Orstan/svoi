<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MasterProfile;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $favorites = $request->user()
            ->favorites()
            ->with(['user', 'location', 'services.category'])
            ->paginate(20);

        return response()->json($favorites);
    }

    public function toggle(Request $request, $masterProfileId)
    {
        $profile = MasterProfile::approved()->findOrFail($masterProfileId);
        
        $user = $request->user();

        if ($user->favorites()->where('master_profile_id', $profile->id)->exists()) {
            $user->favorites()->detach($profile->id);
            return response()->json(['message' => 'Видалено з вибраного', 'favorited' => false]);
        } else {
            $user->favorites()->attach($profile->id);
            return response()->json(['message' => 'Додано до вибраного', 'favorited' => true]);
        }
    }

    public function check(Request $request, $masterProfileId)
    {
        $favorited = $request->user()
            ->favorites()
            ->where('master_profile_id', $masterProfileId)
            ->exists();

        return response()->json(['favorited' => $favorited]);
    }
}

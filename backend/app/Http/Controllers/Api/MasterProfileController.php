<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MasterProfile;
use App\Models\PortfolioItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MasterProfileController extends Controller
{
    public function index(Request $request)
    {
        $query = MasterProfile::with(['user', 'location', 'services.category'])
            ->approved();

        $locationId = $request->get('location_id') ?? $request->get('location');
        $voivodeshipId = $request->get('voivodeship_id');
        $categoryId = $request->get('category_id') ?? $request->get('category');
        $isVerified = $request->get('is_verified');

        if ($locationId) {
            $query->where('location_id', $locationId);
        }

        if ($voivodeshipId) {
            $query->whereHas('location', function ($q) use ($voivodeshipId) {
                $q->where('parent_id', $voivodeshipId);
            });
        }

        if ($categoryId) {
            $query->whereHas('services', function ($q) use ($categoryId) {
                $q->where('category_id', $categoryId);
            });
        }

        if ($isVerified !== null) {
            $query->where('is_verified', filter_var($isVerified, FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->has('has_reviews')) {
            $query->where('reviews_count', '>', 0);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })
                ->orWhere('bio', 'like', "%{$search}%")
                ->orWhereHas('services', function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%");
                });
            });
        }

        $sortBy = $request->get('sort_by', 'rating');
        
        switch ($sortBy) {
            case 'rating':
                $query->orderByDesc('rating')->orderByDesc('reviews_count');
                break;
            case 'newest':
                $query->latest();
                break;
            case 'popular':
                $query->orderByDesc('views_count');
                break;
            case 'boosted':
                $query->orderByDesc('boosted_at')->orderByDesc('is_pro');
                break;
        }

        $perPage = $request->get('per_page', 24);
        
        return $query->paginate($perPage);
    }

    public function show($id)
    {
        $profile = MasterProfile::with([
            'user',
            'location.parent',
            'services.category',
            'portfolioItems' => function ($q) {
                $q->where('is_approved', true);
            },
            'approvedReviews.author'
        ])->approved()->findOrFail($id);

        $profile->incrementViews();

        return response()->json($profile);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'bio' => 'required|string|max:2000',
            'experience_years' => 'required|integer|min:0|max:50',
            'location_id' => 'required|exists:locations,id',
            'whatsapp_link' => 'nullable|url',
            'telegram_link' => 'nullable|url',
            'viber_link' => 'nullable|url',
        ]);

        $user = $request->user();

        if ($user->masterProfile) {
            return response()->json(['error' => 'Профіль майстра вже існує'], 400);
        }

        $user->update(['role' => 'master']);

        $profile = MasterProfile::create([
            'user_id' => $user->id,
            ...$validated,
            'status' => 'pending',
        ]);

        return response()->json($profile->load('user', 'location'), 201);
    }

    public function update(Request $request, $id)
    {
        $profile = MasterProfile::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $validated = $request->validate([
            'bio' => 'string|max:2000',
            'experience_years' => 'integer|min:0|max:50',
            'location_id' => 'exists:locations,id',
            'whatsapp_link' => 'nullable|url',
            'telegram_link' => 'nullable|url',
            'viber_link' => 'nullable|url',
        ]);

        $profile->update($validated);

        return response()->json($profile->load('user', 'location'));
    }

    public function uploadPortfolio(Request $request, $id)
    {
        $profile = MasterProfile::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $request->validate([
            'images' => 'required|array|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120',
            'description' => 'nullable|string|max:500',
        ]);

        $uploadedItems = [];

        foreach ($request->file('images') as $index => $image) {
            $path = $image->store('portfolio', 'public');

            $item = PortfolioItem::create([
                'master_profile_id' => $profile->id,
                'image_path' => $path,
                'description' => $request->description,
                'order' => $profile->portfolioItems()->count() + $index,
                'is_approved' => false,
            ]);

            $uploadedItems[] = $item;
        }

        return response()->json($uploadedItems, 201);
    }

    public function deletePortfolioItem(Request $request, $profileId, $itemId)
    {
        $profile = MasterProfile::where('user_id', $request->user()->id)
            ->findOrFail($profileId);

        $item = PortfolioItem::where('master_profile_id', $profile->id)
            ->findOrFail($itemId);

        Storage::disk('public')->delete($item->image_path);
        $item->delete();

        return response()->json(['message' => 'Зображення видалено']);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MasterProfile;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, $masterProfileId)
    {
        $profile = MasterProfile::findOrFail($masterProfileId);

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $existingReview = Review::where('master_profile_id', $profile->id)
            ->where('author_id', $request->user()->id)
            ->first();

        if ($existingReview) {
            return response()->json(['error' => 'Ви вже залишили відгук для цього майстра'], 400);
        }

        $review = Review::create([
            'master_profile_id' => $profile->id,
            'author_id' => $request->user()->id,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'is_approved' => false,
        ]);

        return response()->json($review->load('author'), 201);
    }

    public function respond(Request $request, $reviewId)
    {
        $review = Review::findOrFail($reviewId);

        $profile = MasterProfile::where('user_id', $request->user()->id)
            ->where('id', $review->master_profile_id)
            ->firstOrFail();

        $validated = $request->validate([
            'master_response' => 'required|string|max:1000',
        ]);

        $review->update([
            'master_response' => $validated['master_response'],
            'response_at' => now(),
        ]);

        return response()->json($review);
    }
}

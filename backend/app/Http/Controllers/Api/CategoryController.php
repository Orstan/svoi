<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Service;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $locale = $request->header('Accept-Language', 'uk');
        
        $categories = Category::with('children')
            ->whereNull('parent_id')
            ->where('is_active', true)
            ->orderBy('order')
            ->get()
            ->map(function ($category) use ($locale) {
                $childIds = $category->children->pluck('id')->all();
                $categoryIds = array_merge([$category->id], $childIds);

                $mastersCount = Service::query()
                    ->whereIn('category_id', $categoryIds)
                    ->where('is_active', true)
                    ->whereHas('masterProfile', function ($q) {
                        $q->approved();
                    })
                    ->distinct('master_profile_id')
                    ->count('master_profile_id');

                return [
                    'id' => $category->id,
                    'name' => $category->getName($locale),
                    'slug' => $category->slug,
                    'icon' => $category->icon,
                    'masters_count' => $mastersCount,
                    'children' => $category->children->map(function ($child) use ($locale) {
                        $childMastersCount = Service::query()
                            ->where('category_id', $child->id)
                            ->where('is_active', true)
                            ->whereHas('masterProfile', function ($q) {
                                $q->approved();
                            })
                            ->distinct('master_profile_id')
                            ->count('master_profile_id');

                        return [
                            'id' => $child->id,
                            'name' => $child->getName($locale),
                            'slug' => $child->slug,
                            'masters_count' => $childMastersCount,
                        ];
                    }),
                ];
            });

        return response()->json($categories);
    }

    public function show($slug, Request $request)
    {
        $locale = $request->header('Accept-Language', 'uk');
        
        $category = Category::where('slug', $slug)
            ->where('is_active', true)
            ->with('children')
            ->firstOrFail();

        $childIds = $category->children->pluck('id')->all();
        $categoryIds = array_merge([$category->id], $childIds);

        $mastersCount = Service::query()
            ->whereIn('category_id', $categoryIds)
            ->where('is_active', true)
            ->whereHas('masterProfile', function ($q) {
                $q->approved();
            })
            ->distinct('master_profile_id')
            ->count('master_profile_id');

        return response()->json([
            'id' => $category->id,
            'name' => $category->getName($locale),
            'slug' => $category->slug,
            'description' => $category->getDescription($locale),
            'icon' => $category->icon,
            'masters_count' => $mastersCount,
            'children' => $category->children->map(function ($child) use ($locale) {
                $childMastersCount = Service::query()
                    ->where('category_id', $child->id)
                    ->where('is_active', true)
                    ->whereHas('masterProfile', function ($q) {
                        $q->approved();
                    })
                    ->distinct('master_profile_id')
                    ->count('master_profile_id');

                return [
                    'id' => $child->id,
                    'name' => $child->getName($locale),
                    'slug' => $child->slug,
                    'masters_count' => $childMastersCount,
                ];
            }),
        ]);
    }
}

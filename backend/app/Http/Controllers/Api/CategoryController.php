<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
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
                return [
                    'id' => $category->id,
                    'name' => $category->getName($locale),
                    'slug' => $category->slug,
                    'icon' => $category->icon,
                    'children' => $category->children->map(function ($child) use ($locale) {
                        return [
                            'id' => $child->id,
                            'name' => $child->getName($locale),
                            'slug' => $child->slug,
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

        return response()->json([
            'id' => $category->id,
            'name' => $category->getName($locale),
            'slug' => $category->slug,
            'description' => $category->getDescription($locale),
            'icon' => $category->icon,
            'children' => $category->children->map(function ($child) use ($locale) {
                return [
                    'id' => $child->id,
                    'name' => $child->getName($locale),
                    'slug' => $child->slug,
                ];
            }),
        ]);
    }
}

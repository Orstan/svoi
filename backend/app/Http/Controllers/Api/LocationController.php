<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index(Request $request)
    {
        $query = Location::query();

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('parent_id')) {
            $query->where('parent_id', $request->parent_id);
        }

        if ($request->type === 'voivodeship') {
            $locations = $query->with('children')->get();
        } else {
            $locations = $query->get();
        }

        return response()->json($locations);
    }

    public function voivodeships()
    {
        $voivodeships = Location::voivodeships()
            ->with(['children' => function ($query) {
                $query->orderBy('name');
            }])
            ->orderBy('name')
            ->get();

        return response()->json($voivodeships);
    }

    public function cities(Request $request)
    {
        $query = Location::cities();

        if ($request->has('voivodeship_id')) {
            $query->where('parent_id', $request->voivodeship_id);
        }

        $cities = $query->orderBy('name')->get();

        return response()->json($cities);
    }

    public function show($slug)
    {
        $location = Location::where('slug', $slug)
            ->with(['parent', 'children'])
            ->firstOrFail();

        return response()->json($location);
    }
}

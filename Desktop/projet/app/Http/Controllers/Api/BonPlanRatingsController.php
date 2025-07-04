<?php

namespace App\Http\Controllers\Api;

use App\Models\BonPlan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\RatingResource;
use App\Http\Resources\RatingCollection;

class BonPlanRatingsController extends Controller
{
    public function index(Request $request, BonPlan $bonPlan): RatingCollection
    {
        $this->authorize('view', $bonPlan);

        $search = $request->get('search', '');

        $ratings = $bonPlan
            ->ratings()
            ->search($search)
            ->latest()
            ->paginate();

        return new RatingCollection($ratings);
    }

    public function store(Request $request, BonPlan $bonPlan): RatingResource
    {
        $this->authorize('create', Rating::class);

        $validated = $request->validate([
            'rate_bp' => ['required', 'numeric'],
            'comment_bp' => ['required', 'max:255', 'string'],
            'user_id' => ['required', 'exists:users,id'],
        ]);

        $rating = $bonPlan->ratings()->create($validated);

        return new RatingResource($rating);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\RatingResource;
use App\Http\Resources\RatingCollection;

class UserRatingsController extends Controller
{
    public function index(Request $request, User $user): RatingCollection
    {
        $this->authorize('view', $user);

        $search = $request->get('search', '');

        $ratings = $user
            ->ratings()
            ->search($search)
            ->latest()
            ->paginate();

        return new RatingCollection($ratings);
    }

    public function store(Request $request, User $user): RatingResource
    {
        $this->authorize('create', Rating::class);

        $validated = $request->validate([
            'rate_bp' => ['required', 'numeric'],
            'comment_bp' => ['required', 'max:255', 'string'],
            'bon_plan_id' => ['required', 'exists:bon_plans,id'],
        ]);

        $rating = $user->ratings()->create($validated);

        return new RatingResource($rating);
    }
}

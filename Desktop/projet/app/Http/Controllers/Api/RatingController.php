<?php

namespace App\Http\Controllers\Api;

use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\RatingResource;
use App\Http\Resources\RatingCollection;
use App\Http\Requests\RatingStoreRequest;
use App\Http\Requests\RatingUpdateRequest;

class RatingController extends Controller
{
    public function index(Request $request): RatingCollection
    {
        $this->authorize('view-any', Rating::class);

        $search = $request->get('search', '');

        $ratings = Rating::search($search)
            ->latest()
            ->paginate();

        return new RatingCollection($ratings);
    }

    public function store(RatingStoreRequest $request): RatingResource
    {
        $this->authorize('create', Rating::class);

        $validated = $request->validated();

        $rating = Rating::create($validated);

        return new RatingResource($rating);
    }

    public function show(Request $request, Rating $rating): RatingResource
    {
        $this->authorize('view', $rating);

        return new RatingResource($rating);
    }

    public function update(
        RatingUpdateRequest $request,
        Rating $rating
    ): RatingResource {
        $this->authorize('update', $rating);

        $validated = $request->validated();

        $rating->update($validated);

        return new RatingResource($rating);
    }

    public function destroy(Request $request, Rating $rating): Response
    {
        $this->authorize('delete', $rating);

        $rating->delete();

        return response()->noContent();
    }
}

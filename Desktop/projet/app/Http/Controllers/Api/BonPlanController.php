<?php

namespace App\Http\Controllers\Api;

use App\Models\BonPlan;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\BonPlanResource;
use App\Http\Resources\BonPlanCollection;
use App\Http\Requests\BonPlanStoreRequest;
use App\Http\Requests\BonPlanUpdateRequest;

class BonPlanController extends Controller
{
    public function index(Request $request): BonPlanCollection
    {
        $this->authorize('view-any', BonPlan::class);

        $search = $request->get('search', '');

        $bonPlans = BonPlan::search($search)
            ->latest()
            ->paginate();

        return new BonPlanCollection($bonPlans);
    }

    public function store(BonPlanStoreRequest $request): BonPlanResource
    {
        $this->authorize('create', BonPlan::class);

        $validated = $request->validated();

        $bonPlan = BonPlan::create($validated);

        return new BonPlanResource($bonPlan);
    }

    public function show(Request $request, BonPlan $bonPlan): BonPlanResource
    {
        $this->authorize('view', $bonPlan);

        return new BonPlanResource($bonPlan);
    }

    public function update(
        BonPlanUpdateRequest $request,
        BonPlan $bonPlan
    ): BonPlanResource {
        $this->authorize('update', $bonPlan);

        $validated = $request->validated();

        $bonPlan->update($validated);

        return new BonPlanResource($bonPlan);
    }

    public function destroy(Request $request, BonPlan $bonPlan): Response
    {
        $this->authorize('delete', $bonPlan);

        $bonPlan->delete();

        return response()->noContent();
    }
}

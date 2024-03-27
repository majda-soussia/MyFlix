<?php

namespace App\Http\Controllers\Api;

use App\Models\BonPlan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\OffreResource;
use App\Http\Resources\OffreCollection;

class BonPlanOffresController extends Controller
{
    public function index(Request $request, BonPlan $bonPlan): OffreCollection
    {
        $this->authorize('view', $bonPlan);

        $search = $request->get('search', '');

        $offres = $bonPlan
            ->offres()
            ->search($search)
            ->latest()
            ->paginate();

        return new OffreCollection($offres);
    }

    public function store(Request $request, BonPlan $bonPlan): OffreResource
    {
        $this->authorize('create', Offre::class);

        $validated = $request->validate([
            'title' => ['required', 'max:255', 'string'],
            'content' => ['required', 'max:255', 'string'],
        ]);

        $offre = $bonPlan->offres()->create($validated);

        return new OffreResource($offre);
    }
}

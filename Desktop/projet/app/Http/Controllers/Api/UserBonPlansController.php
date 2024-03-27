<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\BonPlanResource;
use App\Http\Resources\BonPlanCollection;

class UserBonPlansController extends Controller
{
    public function index(Request $request, User $user): BonPlanCollection
    {
        $this->authorize('view', $user);

        $search = $request->get('search', '');

        $bonPlans = $user
            ->bonPlans()
            ->search($search)
            ->latest()
            ->paginate();

        return new BonPlanCollection($bonPlans);
    }

    public function store(Request $request, User $user): BonPlanResource
    {
        $this->authorize('create', BonPlan::class);

        $validated = $request->validate([
            'nom_bp' => ['required', 'max:255', 'string'],
            'categorie_bp' => ['required', 'max:255', 'string'],
            'tel_bp' => ['required', 'max:255', 'string'],
            'desc_bp' => ['required', 'max:255', 'string'],
            'location' => ['required', 'max:255', 'string'],
            'ouverture ' => ['required', 'max:255', 'string'],
            'fermuture ' => ['required', 'max:255', 'string'],
        ]);

        $bonPlan = $user->bonPlans()->create($validated);

        return new BonPlanResource($bonPlan);
    }
}

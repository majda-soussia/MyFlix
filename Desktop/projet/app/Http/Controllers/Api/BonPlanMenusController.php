<?php

namespace App\Http\Controllers\Api;

use App\Models\BonPlan;
use Illuminate\Http\Request;
use App\Http\Resources\MenuResource;
use App\Http\Controllers\Controller;
use App\Http\Resources\MenuCollection;

class BonPlanMenusController extends Controller
{
    public function index(Request $request, BonPlan $bonPlan): MenuCollection
    {
        $this->authorize('view', $bonPlan);

        $search = $request->get('search', '');

        $menus = $bonPlan
            ->menus()
            ->search($search)
            ->latest()
            ->paginate();

        return new MenuCollection($menus);
    }

    public function store(Request $request, BonPlan $bonPlan): MenuResource
    {
        $this->authorize('create', Menu::class);

        $validated = $request->validate([
            'nom' => ['required', 'max:255', 'string'],
        ]);

        $menu = $bonPlan->menus()->create($validated);

        return new MenuResource($menu);
    }
}

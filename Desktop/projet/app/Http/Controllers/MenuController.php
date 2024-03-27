<?php

namespace App\Http\Controllers;
use App\Models\Offre;
use App\Models\Menu;
use App\Models\BonPlan;
use Illuminate\View\View;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\MenuStoreRequest;
use App\Http\Requests\MenuUpdateRequest;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($bon_plan_id): View
{
    $this->authorize('view-any', Menu::class);

    $menus = Menu::where('bon_plan_id', $bon_plan_id)
        ->latest()
        ->paginate(5)
        ->withQueryString();

    $offres = Offre::where('bon_plan_id', $bon_plan_id)->get(); 

    return view('app.bon_plans.menu', compact('menus', 'offres'));
}
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): View
    {
        $this->authorize('create', Menu::class);

        $bonPlans = BonPlan::pluck('nom_bp', 'id');

        return view('app.menus.create', compact('bonPlans'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MenuStoreRequest $request): RedirectResponse
    {
        $this->authorize('create', Menu::class);

        $validated = $request->validated();

        $menu = Menu::create($validated);

        return redirect()
            ->route('menus.edit', $menu)
            ->withSuccess(__('crud.common.created'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Menu $menu): View
    {
        $this->authorize('view', $menu);

        return view('app.menus.show', compact('menu'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Menu $menu): View
    {
        $this->authorize('update', $menu);

        $bonPlans = BonPlan::pluck('nom_bp', 'id');

        return view('app.menus.edit', compact('menu', 'bonPlans'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        MenuUpdateRequest $request,
        Menu $menu
    ): RedirectResponse {
        $this->authorize('update', $menu);

        $validated = $request->validated();

        $menu->update($validated);

        return redirect()
            ->route('menus.edit', $menu)
            ->withSuccess(__('crud.common.saved'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Menu $menu): RedirectResponse
    {
        $this->authorize('delete', $menu);

        $menu->delete();

        return redirect()
            ->route('menus.index')
            ->withSuccess(__('crud.common.removed'));
    }
}
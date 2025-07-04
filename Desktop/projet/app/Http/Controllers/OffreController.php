<?php

namespace App\Http\Controllers;

use App\Models\Offre;
use App\Models\BonPlan;
use Illuminate\View\View;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\OffreStoreRequest;
use App\Http\Requests\OffreUpdateRequest;

class OffreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): View
    {
        $this->authorize('view-any', Offre::class);

        $search = $request->get('search', '');

        $offres = Offre::search($search)
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return view('app.offres.index', compact('offres', 'search'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): View
    {
        $this->authorize('create', Offre::class);

        $bonPlans = BonPlan::pluck('nom_bp', 'id');

        return view('app.offres.create', compact('bonPlans'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OffreStoreRequest $request): RedirectResponse
    {
        $this->authorize('create', Offre::class);

        $validated = $request->validated();

        $offre = Offre::create($validated);

        return redirect()
            ->route('offres.edit', $offre)
            ->withSuccess(__('crud.common.created'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Offre $offre): View
    {
        $this->authorize('view', $offre);

        return view('app.offres.show', compact('offre'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Offre $offre): View
    {
        $this->authorize('update', $offre);

        $bonPlans = BonPlan::pluck('nom_bp', 'id');

        return view('app.offres.edit', compact('offre', 'bonPlans'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        OffreUpdateRequest $request,
        Offre $offre
    ): RedirectResponse {
        $this->authorize('update', $offre);

        $validated = $request->validated();

        $offre->update($validated);

        return redirect()
            ->route('offres.edit', $offre)
            ->withSuccess(__('crud.common.saved'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Offre $offre): RedirectResponse
    {
        $this->authorize('delete', $offre);

        $offre->delete();

        return redirect()
            ->route('offres.index')
            ->withSuccess(__('crud.common.removed'));
    }
}

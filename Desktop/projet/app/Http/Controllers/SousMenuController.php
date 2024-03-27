<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\SousMenu;
use Illuminate\View\View;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\SousMenuStoreRequest;
use App\Http\Requests\SousMenuUpdateRequest;

class SousMenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): View
    {
        $this->authorize('view-any', SousMenu::class);

        $search = $request->get('search', '');

        $sousMenus = SousMenu::search($search)
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return view('app.sous_menus.index', compact('sousMenus', 'search'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): View
    {
        $this->authorize('create', SousMenu::class);

        $menus = Menu::pluck('nom', 'id');

        return view('app.sous_menus.create', compact('menus'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SousMenuStoreRequest $request): RedirectResponse
    {
        $this->authorize('create', SousMenu::class);

        $validated = $request->validated();

        $sousMenu = SousMenu::create($validated);

        return redirect()
            ->route('sous-menus.edit', $sousMenu)
            ->withSuccess(__('crud.common.created'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, SousMenu $sousMenu): View
    {
        $this->authorize('view', $sousMenu);

        return view('app.sous_menus.show', compact('sousMenu'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, SousMenu $sousMenu): View
    {
        $this->authorize('update', $sousMenu);

        $menus = Menu::pluck('nom', 'id');

        return view('app.sous_menus.edit', compact('sousMenu', 'menus'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        SousMenuUpdateRequest $request,
        SousMenu $sousMenu
    ): RedirectResponse {
        $this->authorize('update', $sousMenu);

        $validated = $request->validated();

        $sousMenu->update($validated);

        return redirect()
            ->route('sous-menus.edit', $sousMenu)
            ->withSuccess(__('crud.common.saved'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(
        Request $request,
        SousMenu $sousMenu
    ): RedirectResponse {
        $this->authorize('delete', $sousMenu);

        $sousMenu->delete();

        return redirect()
            ->route('sous-menus.index')
            ->withSuccess(__('crud.common.removed'));
    }
}

    

<?php

namespace App\Http\Controllers\Api;

use App\Models\Menu;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\SousMenuResource;
use App\Http\Resources\SousMenuCollection;

class MenuSousMenusController extends Controller
{
    public function index(Request $request, Menu $menu): SousMenuCollection
    {
        $this->authorize('view', $menu);

        $search = $request->get('search', '');

        $sousMenus = $menu
            ->sousMenus()
            ->search($search)
            ->latest()
            ->paginate();

        return new SousMenuCollection($sousMenus);
    }

    public function store(Request $request, Menu $menu): SousMenuResource
    {
        $this->authorize('create', SousMenu::class);

        $validated = $request->validate([
            'nom' => ['required', 'max:255', 'string'],
            'prix' => ['required', 'numeric'],
        ]);

        $sousMenu = $menu->sousMenus()->create($validated);

        return new SousMenuResource($sousMenu);
    }
}

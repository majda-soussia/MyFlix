<?php

namespace App\Http\Controllers\Api;

use App\Models\SousMenu;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\SousMenuResource;
use App\Http\Resources\SousMenuCollection;
use App\Http\Requests\SousMenuStoreRequest;
use App\Http\Requests\SousMenuUpdateRequest;

class SousMenuController extends Controller
{
    public function index(Request $request): SousMenuCollection
    {
        $this->authorize('view-any', SousMenu::class);

        $search = $request->get('search', '');

        $sousMenus = SousMenu::search($search)
            ->latest()
            ->paginate();

        return new SousMenuCollection($sousMenus);
    }

    public function store(SousMenuStoreRequest $request): SousMenuResource
    {
        $this->authorize('create', SousMenu::class);

        $validated = $request->validated();

        $sousMenu = SousMenu::create($validated);

        return new SousMenuResource($sousMenu);
    }

    public function show(Request $request, SousMenu $sousMenu): SousMenuResource
    {
        $this->authorize('view', $sousMenu);

        return new SousMenuResource($sousMenu);
    }

    public function update(
        SousMenuUpdateRequest $request,
        SousMenu $sousMenu
    ): SousMenuResource {
        $this->authorize('update', $sousMenu);

        $validated = $request->validated();

        $sousMenu->update($validated);

        return new SousMenuResource($sousMenu);
    }

    public function destroy(Request $request, SousMenu $sousMenu): Response
    {
        $this->authorize('delete', $sousMenu);

        $sousMenu->delete();

        return response()->noContent();
    }
}

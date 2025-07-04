<?php

namespace App\Http\Controllers\Api;

use App\Models\Offre;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\OffreResource;
use App\Http\Resources\OffreCollection;
use App\Http\Requests\OffreStoreRequest;
use App\Http\Requests\OffreUpdateRequest;

class OffreController extends Controller
{
    public function index(Request $request): OffreCollection
    {
        $this->authorize('view-any', Offre::class);

        $search = $request->get('search', '');

        $offres = Offre::search($search)
            ->latest()
            ->paginate();

        return new OffreCollection($offres);
    }

    public function store(OffreStoreRequest $request): OffreResource
    {
        $this->authorize('create', Offre::class);

        $validated = $request->validated();

        $offre = Offre::create($validated);

        return new OffreResource($offre);
    }

    public function show(Request $request, Offre $offre): OffreResource
    {
        $this->authorize('view', $offre);

        return new OffreResource($offre);
    }

    public function update(
        OffreUpdateRequest $request,
        Offre $offre
    ): OffreResource {
        $this->authorize('update', $offre);

        $validated = $request->validated();

        $offre->update($validated);

        return new OffreResource($offre);
    }

    public function destroy(Request $request, Offre $offre): Response
    {
        $this->authorize('delete', $offre);

        $offre->delete();

        return response()->noContent();
    }
}

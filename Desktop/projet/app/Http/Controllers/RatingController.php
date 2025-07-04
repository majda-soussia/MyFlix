<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Rating;
use App\Models\BonPlan;
use Illuminate\View\View;
use Filament\Facades\Filament;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\RatingStoreRequest;
use App\Http\Requests\RatingUpdateRequest;

class RatingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): View
    {
        $this->authorize('view-any', Rating::class);

        $search = $request->get('search', '');

        $ratings = Rating::search($search)
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return view('app.ratings.index', compact('ratings', 'search'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): View
    {
        $this->authorize('create', Rating::class);

        $users = User::pluck('name', 'id');
        $bonPlans = BonPlan::pluck('nom_bp', 'id');

        return view('app.ratings.create', compact('users', 'bonPlans'));
    }

    public function create2(Request $request, BonPlan $bonPlan)
{
    $this->authorize('create', Rating::class);

    $user = Filament::auth()->user();
    $users = User::pluck('name', 'id');

    
    return view('app.bon_plans.rating', compact('users', 'user', 'bonPlan'));
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $bonPlan, $user)
    {
        $this->authorize('create', Rating::class);
    
        // Validez les données du formulaire
        $validatedData = $request->validate([
            // Ajoutez ici les règles de validation pour chaque champ du formulaire
            'rate_bp' => 'required',
            'comment_bp' => 'required',
            // Assurez-vous que bonPlan_id et user_id ne sont pas modifiables par l'utilisateur
        ]);
    
        // Créez la notation en utilisant les données validées
        $rating = new Rating();
        $rating->rate_bp = $validatedData['rate_bp'];
        $rating->comment_bp = $validatedData['comment_bp'];
        $rating->bon_plan_id = $bonPlan;
        $rating->user_id = $user;
        $rating->save();
    
        // Redirigez l'utilisateur vers une autre page après la création de la notation
        return redirect()
    ->route('ratings.show', ['bonPlan' => $bonPlan, 'user' => $user])
    ->withSuccess(__('crud.common.created'));
    }
    /**
     * Display the specified resource.
     */
    public function show(Request $request, Rating $rating): View
{
    $this->authorize('view', $rating);
    $ratings = Rating::all();

    return view('app.bon_plans.Ratings', compact('ratings', 'rating'));
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Rating $rating): View
    {
        $this->authorize('update', $rating);

        $users = User::pluck('name', 'id');
        $bonPlans = BonPlan::pluck('nom_bp', 'id');

        return view('app.ratings.edit', compact('rating', 'users', 'bonPlans'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        RatingUpdateRequest $request,
        Rating $rating
    ): RedirectResponse {
        $this->authorize('update', $rating);

        $validated = $request->validated();

        $rating->update($validated);

        return redirect()
            ->route('ratings.edit', $rating)
            ->withSuccess(__('crud.common.saved'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Rating $rating): RedirectResponse
    {
        $this->authorize('delete', $rating);

        $rating->delete();

        return redirect()
            ->route('ratings.index')
            ->withSuccess(__('crud.common.removed'));
    }
}

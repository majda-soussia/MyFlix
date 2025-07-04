<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\BonPlan;
use Illuminate\View\View;
use Filament\Facades\Filament;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\BonPlanStoreRequest;
use App\Http\Requests\BonPlanUpdateRequest;
use Illuminate\Support\Facades\Validator;
class BonPlanController extends Controller
{

    public function getAllBonPlans()
    {
        // Retrieve all BonPlans from the database
        $bonPlans = BonPlan::all();

        // Return the BonPlans as JSON response
        return response()->json($bonPlans);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): View
    {
        $this->authorize('view-any', BonPlan::class);

        $search = $request->get('search', '');

        $bonPlans = BonPlan::search($search)
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return view('app.bon_plans.index', compact('bonPlans', 'search'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): View
    {
        $this->authorize('create', BonPlan::class);

        $users = User::pluck('name', 'id');

        return view('app.bon_plans.create' ,compact('users'));
    }

    public function create2(Request $request): View
    {
        $this->authorize('create', BonPlan::class);

        $users = User::pluck('name', 'id');
        

        return view('app.bon_plans.c' ,compact('users'));
    }

    public function create3(Request $request): View
    {
        $this->authorize('create', BonPlan::class);

        $user = Filament::auth()->user();
        $users = User::pluck('name', 'id');

        return view('app.bon_plans.c' ,compact('users', 'user'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
{
    $this->authorize('create', BonPlan::class);

    $validator = Validator::make($request->all(), [
        'nom_bp' => ['required', 'max:255', 'string'],
        'categorie_bp' => ['required', 'max:255', 'string'],
        'tel_bp' => ['required', 'max:255', 'string'],
        'desc_bp' => ['required', 'max:255', 'string'],
        'location' => ['required', 'max:255', 'string'],
        'ouverture' => ['required'],
        'fermuture' => ['required'],
    ]);

    // Validate the request data
    if ($validator->fails()) {
        return back()
            ->withErrors($validator)
            ->withInput();
    }

    // Retrieve the authenticated user's ID
    $user_id = Auth::id();

    // Retrieve the validated input
    $validated = $validator->validated();

    // Add the user_id to the validated data
    $validated['user_id'] = $user_id;

    // Create the BonPlan instance
    $bonPlan = BonPlan::create($validated);

    return redirect()
    ->route('bon-plans.create2')
    ->withSuccess(__('crud.common.created'));
}
    /**
     * Display the specified resource.
     */
    public function show(Request $request, BonPlan $bonPlan): View
    {
        $this->authorize('view', $bonPlan);

        return view('app.bon_plans.show', compact('bonPlan'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, BonPlan $bonPlan): View
    {
        $this->authorize('update', $bonPlan);

        $users = User::pluck('name', 'id');

        return view('app.bon_plans.edit', compact('bonPlan', 'users'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        BonPlanUpdateRequest $request,
        BonPlan $bonPlan
    ): RedirectResponse {
        $this->authorize('update', $bonPlan);

        $validated = $request->validated();

        $bonPlan->update($validated);

        return redirect()
            ->route('bon-plans.edit', $bonPlan)
            ->withSuccess(__('crud.common.saved'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(
        Request $request,
        BonPlan $bonPlan
    ): RedirectResponse {
        $this->authorize('delete', $bonPlan);

        $bonPlan->delete();

        return redirect()
            ->route('bon-plans.index')
            ->withSuccess(__('crud.common.removed'));
    }
}



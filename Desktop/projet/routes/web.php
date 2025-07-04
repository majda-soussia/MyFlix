<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\OffreController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\BonPlanController;
use App\Http\Controllers\SousMenuController;
use App\Http\Controllers\PermissionController;
use App\Models\Rating;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::middleware(['auth:sanctum', 'verified'])
    ->get('/dashboard', function () {
        return view('dashboard');
    })
    ->name('dashboard');

Route::prefix('/')
    ->middleware(['auth:sanctum', 'verified'])
    ->group(function () {
        Route::resource('roles', RoleController::class);
        Route::resource('permissions', PermissionController::class);

        
       

      
        Route::post('bon-plans', [BonPlanController::class, 'store'])->name(
            'bon-plans.store'
        );

        Route::get('bonplans/c', [
            BonPlanController::class,
            'create2',
        ])->name('bon-plans.create2')
        ;
        
        //Route pour bon plan (user connecté)
        Route::get('bonplans/c/{user}', [
            BonPlanController::class,
            'create3',
        ])->name('bon-plans.create3')
        ;

        Route::get('bonplans/{bonPlan}/users/{user}/ratings/create', [RatingController::class, 'create2'])->name('ratings.create');
        Route::post('bonplans/{bonPlan}/users/{user}/ratings', [RatingController::class, 'store'])->name('ratings.store');
        Route::get('bonplans/{bonPlan}/users/{user}/ratings', [RatingController::class, 'show'])->name('ratings.show');
        Route::get('bon-plans/{bonPlan}/ratings/{ratings}/edit', [RatingController::class,'edit',])->name('ratings.edit');
        
        Route::get('bon-plans/{bonPlan}/menus', [MenuController::class, 'index'])->name('menus.index');


        Route::get('bon-plans/{bonPlan}', [
            BonPlanController::class,
            'show',
        ])->name('bon-plans.show');
        Route::get('bon-plans/{bonPlan}/edit', [
            BonPlanController::class,
            'edit',
        ])->name('bon-plans.edit');
        Route::put('bon-plans/{bonPlan}', [
            BonPlanController::class,
            'update',
        ])->name('bon-plans.update');
        Route::delete('bon-plans/{bonPlan}', [
            BonPlanController::class,
            'destroy',
        ])->name('bon-plans.destroy');

      
    });

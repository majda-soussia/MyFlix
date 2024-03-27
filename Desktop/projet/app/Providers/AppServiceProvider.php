<?php

namespace App\Providers;
use App\Models\BonPlan;
use App\Observers\BonPlanObserver;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        BonPlan::observe(BonPlanObserver::class);
    }
}

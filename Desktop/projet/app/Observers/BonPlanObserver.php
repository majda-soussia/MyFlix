<?php

namespace App\Observers;

use App\Models\BonPlan;

class BonPlanObserver
{
    /**
     * Handle the BonPlan "created" event.
     */
    public function created(BonPlan $bonPlan): void
    {
        $bonPlan->user_id = auth()->id();
        $bonPlan->save();
    }

    /**
     * Handle the BonPlan "updated" event.
     */
    public function updated(BonPlan $bonPlan): void
    {
        //
    }

    /**
     * Handle the BonPlan "deleted" event.
     */
    public function deleted(BonPlan $bonPlan): void
    {
        //
    }

    /**
     * Handle the BonPlan "restored" event.
     */
    public function restored(BonPlan $bonPlan): void
    {
        //
    }

    /**
     * Handle the BonPlan "force deleted" event.
     */
    public function forceDeleted(BonPlan $bonPlan): void
    {
        //
    }
}
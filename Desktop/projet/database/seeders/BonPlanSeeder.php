<?php

namespace Database\Seeders;

use App\Models\BonPlan;
use Illuminate\Database\Seeder;

class BonPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BonPlan::factory()
            ->count(5)
            ->create();
    }
}

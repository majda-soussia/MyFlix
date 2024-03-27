<?php

namespace Database\Seeders;

use App\Models\SousMenu;
use Illuminate\Database\Seeder;

class SousMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SousMenu::factory()
            ->count(5)
            ->create();
    }
}

<?php

namespace Database\Seeders;

use App\Models\Offre;
use Illuminate\Database\Seeder;

class OffreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Offre::factory()
            ->count(5)
            ->create();
    }
}

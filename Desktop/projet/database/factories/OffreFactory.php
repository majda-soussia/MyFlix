<?php

namespace Database\Factories;

use App\Models\Offre;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class OffreFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Offre::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(10),
            'content' => $this->faker->text,
            'bon_plan_id' => \App\Models\BonPlan::factory(),
        ];
    }
}

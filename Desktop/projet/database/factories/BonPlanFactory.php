<?php

namespace Database\Factories;

use App\Models\BonPlan;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class BonPlanFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = BonPlan::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom_bp' => $this->faker->text(255),
            'categorie_bp' => $this->faker->text(255),
            'tel_bp' => $this->faker->text(255),
            'desc_bp' => $this->faker->text(255),
            'location' => $this->faker->text(255),
            'ouverture ' => $this->faker->text(255),
            'fermuture ' => $this->faker->text(255),
            'user_id' => \App\Models\User::factory(),
        ];
    }
}

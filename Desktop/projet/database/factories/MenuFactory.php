<?php

namespace Database\Factories;

use App\Models\Menu;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class MenuFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Menu::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => $this->faker->text(255),
            'bon_plan_id' => \App\Models\BonPlan::factory(),
        ];
    }
}

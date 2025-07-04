<?php

namespace Database\Factories;

use App\Models\SousMenu;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class SousMenuFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = SousMenu::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => $this->faker->text(255),
            'prix' => $this->faker->randomNumber(2),
            'menu_id' => \App\Models\Menu::factory(),
        ];
    }
}

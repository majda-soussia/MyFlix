<?php

namespace Database\Factories;

use App\Models\Rating;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class RatingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Rating::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'rate_bp' => $this->faker->randomNumber(2),
            'comment_bp' => $this->faker->text(255),
            'user_id' => \App\Models\User::factory(),
            'bon_plan_id' => \App\Models\BonPlan::factory(),
        ];
    }
}

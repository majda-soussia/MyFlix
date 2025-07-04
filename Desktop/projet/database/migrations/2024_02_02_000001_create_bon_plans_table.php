<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bon_plans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nom_bp')->nullable();
            $table->String('image')->nullable();
            $table->string('categorie_bp')->nullable();
            $table->string('tel_bp')->nullable();
            $table->string('desc_bp')->nullable();
            $table->string('location')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('ouverture')->nullable();
            $table->string('fermuture')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bon_plans');
    }
};

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
        Schema::create('sous_menus', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nom');
            $table->float('prix');
            $table->unsignedBigInteger('menu_id');
            $table->unsignedBigInteger('bon_plan_id');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sous_menus');
    }
};

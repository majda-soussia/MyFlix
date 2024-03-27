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
        Schema::table('sous_menus', function (Blueprint $table) {
            $table
                ->foreign('menu_id')
                ->references('id')
                ->on('menus')
                ->onUpdate('CASCADE')
                ->onDelete('CASCADE');

            $table
                ->foreign('bon_plan_id')
                ->references('id')
                ->on('bon_plans')
                ->onUpdate('CASCADE')
                ->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sous_menus', function (Blueprint $table) {
            $table->dropForeign(['menu_id']);
            $table->dropForeign(['bon_plan_id']);
        });
    }
};

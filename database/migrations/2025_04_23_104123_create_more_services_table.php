<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use function Laravel\Prompts\table;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('more_services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('serviceId');
            $table->longText('doc');
            $table->string('image');
            $table->enum('position', ['left', 'right'])->default('right');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('more_services');
    }
};

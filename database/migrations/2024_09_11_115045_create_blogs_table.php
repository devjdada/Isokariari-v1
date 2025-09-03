<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->longText('content');
            $table->longText('description');
            $table->boolean('status')->default(true);
            $table->string('image');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Changed from 'author' and added foreign key
            $table->foreignId('category_id')->constrained()->onDelete('cascade'); // Changed from 'category'
            $table->boolean('is_published')->default(false); // New field
            $table->timestamp('published_at')->nullable(); // New field
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};

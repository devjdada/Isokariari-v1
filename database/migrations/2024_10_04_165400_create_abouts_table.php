<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Creating the 'abouts' table
        Schema::create('abouts', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->longText('about');
            $table->longText('history')->nullable();
            $table->longText('achivement')->nullable();
            $table->string('purpose')->nullable();
            $table->string('value')->nullable();
            $table->string('image')->nullable();
            $table->string('logo')->nullable();
            $table->string('logo2')->nullable();
            $table->string('vision')->nullable();
            $table->string('mission')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('address')->nullable();
            $table->string('facebook')->nullable();
            $table->string('twitter')->nullable();
            $table->string('instagram')->nullable();
            $table->string('linkedin')->nullable();
            $table->timestamps();
        });

        // Inserting sample data into the 'abouts' table
        DB::table('abouts')->insert([
            'title' => 'About Us',
            'about' => 'We are a company that excels in providing quality solutions for our clients.',
            'achivement' => 'Achieved 100% client satisfaction in 2023',
            'history' => 'Achieved 100% client satisfaction in 2023',
            'image' => 'about_image.jpg',
            'logo' => 'logo.png',
            'logo2' => 'secondary_logo.png',
            'vision' => 'To become the global leader in our industry.',
            'mission' => 'Providing the best possible solutions with innovation.',
            'purpose' => 'Providing the best possible solutions with innovation.',
            'phone' => '+1234567890',
            'email' => 'info@example.com',
            'address' => '1234 Street Name, City, Country',
            'facebook' => 'https://facebook.com/yourcompany',
            'twitter' => 'https://twitter.com/yourcompany',
            'instagram' => 'https://instagram.com/yourcompany',
            'linkedin' => 'https://linkedin.com/company/yourcompany',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Dropping the 'abouts' table
        Schema::dropIfExists('abouts');
    }
};

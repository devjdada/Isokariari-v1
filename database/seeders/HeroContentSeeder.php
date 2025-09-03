<?php

namespace Database\Seeders;

use App\Models\HeroContent;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HeroContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HeroContent::create([
            'title' => 'Building a Better Nigeria, One Project at a Time',
            'subtitle' => 'We are a leading construction and engineering company in Nigeria, committed to delivering high-quality projects that shape the nation\'s infrastructure.',
            'image_path' => 'hero/hero-1.jpg',
        ]);
    }
}
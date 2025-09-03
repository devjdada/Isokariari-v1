<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Service::create([
            'title' => 'Civil Engineering',
            'description' => 'We offer a wide range of civil engineering services, including road construction, bridges, and drainage systems.',
            'image' => 'services/service-1.jpg',
            'slug' => 'civil-engineering',
            'category_id' => 1,
        ]);

        Service::create([
            'title' => 'Building Construction',
            'description' => 'We specialize in the construction of residential, commercial, and industrial buildings.',
            'image' => 'services/service-2.jpg',
            'slug' => 'building-construction',
            'category_id' => 2,
        ]);

        Service::create([
            'title' => 'Project Management',
            'description' => 'We provide expert project management services to ensure that your project is completed on time and within budget.',
            'image' => 'services/service-3.jpg',
            'slug' => 'project-management',
            'category_id' => 1,
        ]);
    }
}
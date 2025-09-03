<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::create([
            'title' => 'Lagos-Ibadan Expressway',
            'description' => 'The Lagos-Ibadan Expressway is a 127.6-kilometre-long (79.3 mi) expressway connecting Ibadan, the capital of Oyo State and Lagos, Nigeria\'s largest city.',
            'doc' => 'doc',
            'image' => 'projects/project-1.jpg',
            'slug' => 'lagos-ibadan-expressway',
            'location' => 'Lagos-Ibadan',
            'complete' => '2022-12-31',
            'type' => 'Road Construction',
            'category_id' => 1,
            'clientId' => 1,
        ]);

        Project::create([
            'title' => 'Second Niger Bridge',
            'description' => 'The Second Niger Bridge is a Nigerian federal government project that is 1.6 km long and furnished with other ancillary infrastructure including a 10.3 km highway, Owerri interchange and a toll station.',
            'doc' => 'doc',
            'image' => 'projects/project-2.jpg',
            'slug' => 'second-niger-bridge',
            'location' => 'Onitsha-Asaba',
            'complete' => '2023-03-31',
            'type' => 'Bridge Construction',
            'category_id' => 1,
            'clientId' => 1,
        ]);
    }
}
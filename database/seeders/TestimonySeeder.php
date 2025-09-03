<?php

namespace Database\Seeders;

use App\Models\Testimony;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestimonySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Testimony::create([
            'name' => 'John Doe',
            'position' => 'CEO, Dangote Group',
            'company' => 'Dangote Group',
            'content' => 'O.K. Isokariari & Sons has been a reliable partner in our expansion projects. Their commitment to quality and timely delivery is commendable.',
            'image' => 'testimonies/testimony-1.jpg',
        ]);

        Testimony::create([
            'name' => 'Jane Smith',
            'position' => 'MD, Julius Berger',
            'company' => 'Julius Berger',
            'content' => 'We have worked with O.K. Isokariari & Sons on several projects, and they have always delivered excellent results. Their team is professional and easy to work with.',
            'image' => 'testimonies/testimony-2.jpg',
        ]);
    }
}
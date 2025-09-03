<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Client::create([
            'name' => 'Dangote Group',
            'image' => 'clients/dangote.png',
        ]);

        Client::create([
            'name' => 'Julius Berger',
            'image' => 'clients/julius-berger.png',
        ]);

        Client::create([
            'name' => 'Lafarge',
            'image' => 'clients/lafarge.png',
        ]);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EquipmentController extends Controller
{
    public function index()
    {
        $equipments = Equipment::latest()->get()->map(function ($equipment) {
            $equipment->image = Storage::url($equipment->image);
            return $equipment;
        });

        $clients = Client::latest()->get()->map(function ($client) {
            $client->image = Storage::url($client->image);
            return $client;
        });

        return Inertia::render('Equipment/Index', [
            'equipments' => $equipments,
            'clients' => $clients,
        ]);
    }

    public function show(Equipment $equipment)
    {
        $equipment->image = Storage::url($equipment->image);
        return Inertia::render('Equipment/Show', ['equipment' => $equipment]);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Equipment;
use App\Models\HeroContent;
use App\Models\Project;
use App\Models\Service;
use App\Models\Testimony;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        $hero = HeroContent::get()->map(function ($hero) {
            $hero->image_path = Storage::url($hero->image_path);
            return $hero;
        });

        $services = Service::latest()->get()->map(function ($service) {
            $service->image = Storage::url($service->image);
            return $service;
        });

        $projects = Project::latest()->get()->map(function ($project) {
            $project->image = Storage::url($project->image);
            return $project;
        });

        $testimonies = Testimony::latest()->get()->map(function ($testimony) {
            $testimony->image = Storage::url($testimony->image);
            return $testimony;
        });

        $clients = Client::latest()->get()->map(function ($client) {
            $client->image = Storage::url($client->image);
            return $client;
        });

        $equipmments = Equipment::latest()->get()->map(function ($equipment) {
            $equipment->image = Storage::url($equipment->image);
            return $equipment;
        });

        return Inertia::render('welcome', [
            'hero' => $hero,
            'services' => $services,
            'projects' => $projects,
            'testimonies' => $testimonies,
            'clients' => $clients,
            'equipments' => $equipmments,
        ]);
    }
}

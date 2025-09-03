<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublicClientController extends Controller
{
    public function index()
    {
        $clients = Client::with('projects')->latest()->get()->map(function ($client) {
            $client->image = Storage::url($client->image);
            $client->projects->map(function ($project) {
                $project->image = Storage::url($project->image);
                return $project;
            });
            return $client;
        });

        $projects = Project::latest()->get()->map(function ($project) {
            $project->image = Storage::url($project->image);
            return $project;
        });

        return Inertia::render('PublicClients/Index', [
            'clients' => $clients,
            'projects' => $projects,
        ]);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\Client;
use App\Models\Photo;
use App\Models\Project;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublicAboutController extends Controller
{
    public function index()
    {
        $about = About::first();

        $teams = Team::orderBy('order', 'asc')->get()->map(function ($team) {
            $team->image = Storage::url($team->image);
            return $team;
        });

        $projects = Project::with('category')->latest()->get()->map(function ($project) {
            $project->image = Storage::url($project->image);
            return $project;
        });

        $clients = Client::latest()->get()->map(function ($client) {
            $client->image = Storage::url($client->image);
            return $client;
        });

        $galleries = Photo::where('gallery', 'history')->latest()->get();

        return Inertia::render('About/Index', [
            'about' => $about,
            'teams' => $teams,
            'projects' => $projects,
            'galleries' => $galleries,
            'clients' => $clients,
        ]);
    }
}

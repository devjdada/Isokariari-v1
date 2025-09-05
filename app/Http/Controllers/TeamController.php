<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::orderBy("order", "asc")->get()->map(function ($team) {
            $team->image = Storage::url($team->image);
            return $team;
        });

        $galleries = Photo::where('gallery', 'career')->latest()->get()->map(function ($photo) {
            $photo->image = Storage::url($photo->image);
            return $photo;
        });

        return Inertia::render('Teams/Index', [
            'teams' => $teams,
            'galleries' => $galleries,
        ]);
    }

    public function show(Team $team)
    {
        $team->image = Storage::url($team->image);
        return Inertia::render('Teams/Show', ['team' => $team]);
    }
}

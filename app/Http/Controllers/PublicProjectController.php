<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublicProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('category')->latest()->get()->map(function ($project) {
            $project->image = Storage::url($project->image);
            return $project;
        });

        $categories = Category::all();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'allCat' => $categories,
        ]);
    }

    public function show(Project $project)
    {
        $project->load(['category', 'client', 'project_photos', 'more_projects']);

        $project->image = Storage::url($project->image);

        $project->project_photos->map(function ($photo) {
            $photo->image = Storage::url($photo->image);
            return $photo;
        });

        $project->more_projects->map(function ($more) {
            $more->image = Storage::url($more->image);
            return $more;
        });

        if ($project->client) {
            $project->client->image = Storage::url($project->client->image);
        }

        $relatedProjects = Project::with('category')
            ->where('id', '!=', $project->id)
            ->latest()
            ->take(4)
            ->get()
            ->map(function ($relatedProject) {
                $relatedProject->image = Storage::url($relatedProject->image);
                return $relatedProject;
            });

        return Inertia::render('Projects/Show', [
            'project' => $project,
            'relatedProjects' => $relatedProjects,
        ]);
    }
}

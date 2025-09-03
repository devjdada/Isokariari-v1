<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectPhoto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class ProjectPhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Project $project)
    {
        $project->load('category')->loadCount(['more_projects', 'project_photos']);
        $projectPhotos = $project->project_photos;

        return Inertia::render('Admin/ProjectPhotos/Index', [
            'project' => $project,
            'projectPhotos' => $projectPhotos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Project $project)
    {
        return Inertia::render('Admin/ProjectPhotos/Create', [
            'project' => $project->only('id', 'title', 'slug'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Project $project)
    {
        $validatedData = $request->validate([
            'image' => ['required', 'array'], // Expect an array of photos
            'image.*' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'], // Validate each photo in the array
        ]);

        foreach ($request->file('image') as $photo) {
            $imagePath = $photo->store('projects', 'public');
            $project->project_photos()->create([
                'image' => $imagePath,
            ]);
        }

        return Redirect::route('admin.projects.photos.index', $project->id)
            ->with('success', 'Project photos added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project, ProjectPhoto $photo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project, ProjectPhoto $photo)
    {
        return Inertia::render('Admin/ProjectPhotos/Edit', [
            'project' => $project->only('id', 'title', 'slug'),
            'photo' => $photo,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project, ProjectPhoto $photo)
    {
        $validatedData = $request->validate([
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($photo->image) {
                Storage::disk('public')->delete($photo->image);
            }
            $imagePath = $request->file('image')->store('projects', 'public');
            $validatedData['image'] = $imagePath;
        } else {
            // If no new image is uploaded, retain the old one
            $validatedData['image'] = $photo->image;
        }

        $photo->update($validatedData);

        return Redirect::route('admin.projects.photos.index', $project->id)
            ->with('success', 'Project photo updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project, ProjectPhoto $photo)
    {
        // Delete associated image
        if ($photo->image) {
            Storage::disk('public')->delete($photo->image);
        }

        $photo->delete();

        return Redirect::route('admin.projects.photos.index', $project->id)
            ->with('success', 'Project photo deleted successfully.');
    }
}

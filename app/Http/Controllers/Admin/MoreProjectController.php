<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MoreProject;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class MoreProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Project $project)
    {
        $moreProjects = $project->more_projects; 

        return Inertia::render('Admin/MoreProjects/Index', [
            'project' => $project->only('id', 'title', 'slug'),
            'moreProjects' => $moreProjects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Project $project)
    {
        return Inertia::render('Admin/MoreProjects/Create', [
            'project' => $project->only('id', 'title', 'slug'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Project $project)
    {
        $validatedData = $request->validate([
            'doc' => ['required', 'string'],
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'position' => ['required', Rule::in(['left', 'right'])],
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/more_projects', 'public');
            $validatedData['image'] = $imagePath;
        }

        $project->more_projects()->create($validatedData);

        return Redirect::route('admin.projects.more-projects.index', $project->id)
            ->with('success', 'More Project details created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project, MoreProject $moreProject)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project, MoreProject $moreProject)
    {
        return Inertia::render('Admin/MoreProjects/Edit', [
            'project' => $project->only('id', 'title', 'slug'),
            'moreProject' => $moreProject,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project, MoreProject $moreProject)
    {
        $validatedData = $request->validate([
            'doc' => ['required', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'position' => ['required', Rule::in(['left', 'right'])],
        ]);

        if ($request->hasFile('image')) {
            if ($moreProject->image) {
                Storage::disk('public')->delete($moreProject->image);
            }
            $imagePath = $request->file('image')->store('images/more_projects', 'public');
            $validatedData['image'] = $imagePath;
        } else {
            $validatedData['image'] = $moreProject->image;
        }

        $moreProject->update($validatedData);

        return Redirect::route('admin.projects.more-projects.index', $project->id)
            ->with('success', 'More Project details updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project, MoreProject $moreProject)
    {
        if ($moreProject->image) {
            Storage::disk('public')->delete($moreProject->image);
        }
        $moreProject->delete();

        return Redirect::route('admin.projects.more-projects.index', $project->id)
            ->with('success', 'More Project details deleted successfully.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Client;
use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('category')->withCount(['more_projects', 'project_photos'])->get();
        $clients = Client::all(['id', 'name']);
        $users = User::all(['id', 'name']);
        $categories = Category::all(['id', 'name']);

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
            'clients' => $clients,
            'users' => $users,
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $clients = Client::all(['id', 'name']);


        return Inertia::render('Admin/Projects/Create', [
            'clients' => $clients,
            'categories' => Category::all(['id', 'name']),

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'doc' => ['required', 'string'],
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'link' => ['nullable', 'url'],
            'location' => ['nullable', 'string', 'max:255'],
            'complete' => ['nullable', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('projects', 'slug')],
            'status' => ['required', 'boolean'],
            'type' => ['required', 'string', Rule::in(['project', 'case_study'])],
            'category' => ['required', 'exists:categories,id'],
            'clientId' => ['nullable', 'exists:clients,id'],
            'post_by' => ['nullable', 'exists:users,id'],
            'edit_by' => ['nullable', 'exists:users,id'],
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('projects', 'public');
            $validatedData['image'] = $imagePath;
        }

        Project::create($validatedData);

        return Redirect::route('admin.projects.index')
            ->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $project->load(['category', 'client', 'posted_by', 'edited_by', 'project_photos', 'more_projects']);
        return Inertia::render('Admin/Projects/Show', ['project' => $project]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $clients = Client::all(['id', 'name']);
        $users = User::all(['id', 'name']);

        return Inertia::render('Admin/Projects/Edit', [
            'project' => $project,
            'clients' => $clients,
            'users' => $users,
            'categories' => Category::all(['id', 'name']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'doc' => ['required', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'link' => ['nullable', 'url'],
            'location' => ['nullable', 'string', 'max:255'],
            'complete' => ['nullable', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('projects', 'slug')->ignore($project->id)],
            'status' => ['required', 'boolean'],
            'type' => ['required', 'string', Rule::in(['project', 'case_study'])],
            'category' => ['required', 'exists:categories,id'],
            'clientId' => ['nullable', 'exists:clients,id'],
            'post_by' => ['nullable', 'exists:users,id'],
            'edit_by' => ['nullable', 'exists:users,id'],
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            $imagePath = $request->file('image')->store('projects', 'public');
            $validatedData['image'] = $imagePath;
        } else {
            // If no new image is uploaded, retain the old one
            $validatedData['image'] = $project->image;
        }

        $project->update($validatedData);

        return Redirect::route('admin.projects.index')
            ->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        // Delete associated image
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        $project->delete();

        return Redirect::route('admin.projects.index')
            ->with('success', 'Project deleted successfully.');
    }
}

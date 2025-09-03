<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::latest()->get();
        return Inertia::render('Admin/Teams/Index', ['teams' => $teams]);
    }

    public function create()
    {
        return Inertia::render('Admin/Teams/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'twitter' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'email' => 'required|string|email|max:255|unique:team',
            'status' => 'boolean',
            'about' => 'nullable|string',
            'order' => 'required|integer',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('teams', 'public');
            $validatedData['image'] = $imagePath;
        }

        Team::create($validatedData);

        return redirect()->route('admin.teams.index')->with('success', 'Team created successfully.');
    }

    public function edit(Team $team)
    {
        return Inertia::render('Admin/Teams/Edit', ['team' => $team]);
    }

    public function update(Request $request, Team $team)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'twitter' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'email' => 'required|string|email|max:255|unique:team,email,' . $team->id,
            'status' => 'boolean',
            'about' => 'nullable|string',
            'order' => 'required|integer',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($team->image) {
                Storage::disk('public')->delete($team->image);
            }
            $imagePath = $request->file('image')->store('teams', 'public');
            $validatedData['image'] = $imagePath;
        } else {
            // If no new image is uploaded, retain the old one
            $validatedData['image'] = $team->image;
        }

        $team->update($validatedData);

        return redirect()->route('admin.teams.index')->with('success', 'Team updated successfully.');
    }

    public function destroy(Team $team)
    {
        // Delete associated image
        if ($team->image) {
            Storage::disk('public')->delete($team->image);
        }

        $team->delete();

        return redirect()->route('admin.teams.index')->with('success', 'Team deleted successfully.');
    }
}
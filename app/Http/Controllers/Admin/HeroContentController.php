<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HeroContentController extends Controller
{
    public function index()
    {
        $heroContents = HeroContent::latest()->get();
        return Inertia::render('Admin/HeroContents/Index', ['heroContents' => $heroContents]);
    }

    public function create()
    {
        return Inertia::render('Admin/HeroContents/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'button_text' => 'nullable|string|max:255',
            'button_link' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image_path')) {
            $imagePath = $request->file('image_path')->store('hero_contents', 'public');
            $validatedData['image_path'] = $imagePath;
        }

        HeroContent::create($validatedData);

        return redirect()->route('admin.hero-contents.index')->with('success', 'Hero Content created successfully.');
    }

    public function show(HeroContent $heroContent)
    {
        return Inertia::render('Admin/HeroContents/Show', ['heroContent' => $heroContent]);
    }

    public function edit(HeroContent $heroContent)
    {
        return Inertia::render('Admin/HeroContents/Edit', ['heroContent' => $heroContent]);
    }

    public function update(Request $request, HeroContent $heroContent)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'button_text' => 'nullable|string|max:255',
            'button_link' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image_path')) {
            // Delete old image if it exists
            if ($heroContent->image_path && Storage::disk('public')->exists($heroContent->image_path)) {
                Storage::disk('public')->delete($heroContent->image_path);
            }
            $imagePath = $request->file('image_path')->store('hero_contents', 'public');
            $validatedData['image_path'] = $imagePath;
        } else {
            // If no new image is uploaded, retain the old one
            $validatedData['image_path'] = $heroContent->image_path;
        }

        $heroContent->update($validatedData);

        return redirect()->route('admin.hero-contents.index')->with('success', 'Hero Content updated successfully.');
    }

    public function destroy(HeroContent $heroContent)
    {
        // Delete associated image
        if ($heroContent->image_path && Storage::disk('public')->exists($heroContent->image_path)) {
            Storage::disk('public')->delete($heroContent->image_path);
        }

        $heroContent->delete();

        return redirect()->route('admin.hero-contents.index')->with('success', 'Hero Content deleted successfully.');
    }
}
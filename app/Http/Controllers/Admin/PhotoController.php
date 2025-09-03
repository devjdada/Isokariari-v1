<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PhotoController extends Controller
{
    public function index()
    {
        $photos = Photo::latest()->get();
        return Inertia::render('Admin/Photos/Index', ['photos' => $photos]);
    }

    public function create()
    {
        return Inertia::render('Admin/Photos/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'gallery' => 'nullable|string|max:255',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string',
        ]);

        $description = $request->input('description');
        $gallery = $request->input('gallery');

        foreach ($request->file('images') as $image) {
            $imagePath = $image->store('photos', 'public');
            Photo::create([
                'gallery' => $gallery,
                'image' => $imagePath,
                'description' => $description,
            ]);
        }

        return redirect()->route('admin.photos.index')->with('success', 'Photo created successfully.');
    }

    public function show(Photo $photo)
    {
        return Inertia::render('Admin/Photos/Show', ['photo' => $photo]);
    }

    public function edit(Photo $photo)
    {
        return Inertia::render('Admin/Photos/Edit', ['photo' => $photo]);
    }

    public function update(Request $request, Photo $photo)
    {
        $validatedData = $request->validate([
            'gallery' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            if ($photo->image && Storage::disk('public')->exists($photo->getRawOriginal('image'))) {
                Storage::disk('public')->delete($photo->getRawOriginal('image'));
            }
            $imagePath = $request->file('image')->store('photos', 'public');
            $validatedData['image'] = $imagePath;
        } else {
            $validatedData['image'] = $photo->getRawOriginal('image');
        }

        $photo->update($validatedData);

        return redirect()->route('admin.photos.index')->with('success', 'Photo updated successfully.');
    }

    public function destroy(Photo $photo)
    {
        if ($photo->image && Storage::disk('public')->exists($photo->getRawOriginal('image'))) {
            Storage::disk('public')->delete($photo->getRawOriginal('image'));
        }

        $photo->delete();

        return redirect()->route('admin.photos.index')->with('success', 'Photo deleted successfully.');
    }
}
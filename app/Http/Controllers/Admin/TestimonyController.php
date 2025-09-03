<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimony;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TestimonyController extends Controller
{
    public function index()
    {
        $testimonies = Testimony::latest()->get();
        return Inertia::render('Admin/Testimonies/Index', ['testimonies' => $testimonies]);
    }

    public function create()
    {
        return Inertia::render('Admin/Testimonies/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('testimonies', 'public');
            $validatedData['image'] = $imagePath;
        }

        Testimony::create($validatedData);

        return redirect()->route('admin.testimonies.index')->with('success', 'Testimony created successfully.');
    }

    public function show(Testimony $testimony)
    {
        return Inertia::render('Admin/Testimonies/Show', ['testimony' => $testimony]);
    }

    public function edit(Testimony $testimony)
    {
        return Inertia::render('Admin/Testimonies/Edit', ['testimony' => $testimony]);
    }

    public function update(Request $request, Testimony $testimony)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($testimony->image && Storage::disk('public')->exists($testimony->getRawOriginal('image'))) {
                Storage::disk('public')->delete($testimony->getRawOriginal('image'));
            }
            $imagePath = $request->file('image')->store('testimonies', 'public');
            $validatedData['image'] = $imagePath;
        } else {
            // If no new image is uploaded, retain the old one
            // Check if the image was explicitly removed (e.g., by setting a hidden field to null)
            // If not, keep the existing raw image path
            if ($request->input('image_removed')) { // Assuming a hidden field 'image_removed' is sent when image is cleared
                if ($testimony->image && Storage::disk('public')->exists($testimony->getRawOriginal('image'))) {
                    Storage::disk('public')->delete($testimony->getRawOriginal('image'));
                }
                $validatedData['image'] = null;
            } else {
                $validatedData['image'] = $testimony->getRawOriginal('image');
            }
        }

        $testimony->update($validatedData);

        return redirect()->route('admin.testimonies.index')->with('success', 'Testimony updated successfully.');
    }

    public function destroy(Testimony $testimony)
    {
        // Delete associated image
        if ($testimony->image && Storage::disk('public')->exists($testimony->getRawOriginal('image'))) {
            Storage::disk('public')->delete($testimony->getRawOriginal('image'));
        }

        $testimony->delete();

        return redirect()->route('admin.testimonies.index')->with('success', 'Testimony deleted successfully.');
    }
}
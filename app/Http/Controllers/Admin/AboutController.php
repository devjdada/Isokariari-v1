<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function manage()
    {
        $about = About::firstOrNew([]); // Get the first record or create a new empty one

        return Inertia::render('Admin/About/Manage', [
            'about' => $about,
        ]);
    }

    public function update(Request $request)
    {
        $about = About::firstOrNew([]);

        $validatedData = $request->validate([
            'title' => 'nullable|string|max:255',
            'about' => 'required|string',
            'history' => 'nullable|string',
            'achivement' => 'nullable|string',
            'purpose' => 'nullable|string',
            'value' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'logo2' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'vision' => 'nullable|string',
            'mission' => 'nullable|string',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:255',
            'facebook' => 'nullable|url|max:255',
            'twitter' => 'nullable|url|max:255',
            'instagram' => 'nullable|url|max:255',
            'linkedin' => 'nullable|url|max:255',
        ]);

        // Handle image uploads
        foreach (['image', 'logo', 'logo2'] as $fileField) {
            if ($request->hasFile($fileField)) {
                // Delete old file if exists
                if ($about->$fileField && Storage::disk('public')->exists($about->getRawOriginal($fileField))) {
                    Storage::disk('public')->delete($about->getRawOriginal($fileField));
                }
                $path = $request->file($fileField)->store('about', 'public');
                $validatedData[$fileField] = $path;
            } else if ($request->input($fileField) === null && $about->$fileField) {
                // If the field is explicitly set to null (e.g., image removed from form)
                Storage::disk('public')->delete($about->getRawOriginal($fileField));
                $validatedData[$fileField] = null;
            } else {
                // Keep existing image if no new file is uploaded and not explicitly set to null
                $validatedData[$fileField] = $about->getRawOriginal($fileField);
            }
        }

        $about->fill($validatedData);
        $about->save();

        return redirect()->back()->with('success', 'About information updated successfully.');
    }
}
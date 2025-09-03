<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\PageImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PageImageController extends Controller
{
    public function index(Page $page)
    {
        $pageImages = $page->images()->get();
        return Inertia::render('Admin/PageImages/Index', [
            'page' => $page,
            'pageImages' => $pageImages,
        ]);
    }

    public function store(Request $request, Page $page)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        foreach ($request->file('images') as $image) {
            $imagePath = $image->store('images', 'public');
            $page->images()->create([
                'image' => $imagePath,
            ]);
        }

        return redirect()->back()->with('success', 'Images added successfully.');
    }

    public function destroy(Page $page, PageImage $image)
    {
        if ($image->pageId !== $page->id) {
            abort(403, 'Unauthorized action.');
        }

        Storage::disk('public')->delete($image->image);
        $image->delete();

        return redirect()->back()->with('success', 'Image deleted successfully.');
    }
}

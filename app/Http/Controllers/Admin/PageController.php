<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pages = Page::withCount(['images'])->get();
        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Pages/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'contents' => ['required', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('pages', 'slug')],
            'more' => ['nullable', 'string'],
            'status' => ['required', 'boolean'],
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('pages', 'public');
            $validatedData['image'] = $imagePath;
        }

        Page::create($validatedData);

        return Redirect::route('admin.pages.index')
            ->with('success', 'Page created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Page $page)
    {
        $page->load(['images']);
        return Inertia::render('Admin/Pages/Show', ['page' => $page]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page)
    {
        return Inertia::render('Admin/Pages/Edit', [
            'page' => $page,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Page $page)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'contents' => ['required', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('pages', 'slug')->ignore($page->id)],
            'more' => ['nullable', 'string'],
            'status' => ['required', 'boolean'],
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($page->image) {
                Storage::disk('public')->delete($page->image);
            }
            $imagePath = $request->file('image')->store('pages', 'public');
            $validatedData['image'] = $imagePath;
        } else {
            // If no new image is uploaded, retain the old one
            $validatedData['image'] = $page->image;
        }

        $page->update($validatedData);

        return Redirect::route('admin.pages.index')
            ->with('success', 'Page updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        // Delete associated image
        if ($page->image) {
            Storage::disk('public')->delete($page->image);
        }

        // Delete associated page images (multiple)
        foreach ($page->images as $image) {
            Storage::disk('public')->delete($image->image);
            $image->delete();
        }

        $page->delete();

        return Redirect::route('admin.pages.index')
            ->with('success', 'Page deleted successfully.');
    }
}

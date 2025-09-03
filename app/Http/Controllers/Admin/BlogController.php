<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Category; // Assuming categories are needed for dropdowns
use App\Models\User; // For user_id
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth; // For authenticated user ID
use Carbon\Carbon; // For published_at
use Illuminate\Support\Str; // For slug generation

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::with('user', 'category')->withCount('blog_photos')->get(); // Eager load user and category
        return Inertia::render('Admin/Blogs/Index', [
            'blogs' => $blogs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all(['id', 'name']);
        return Inertia::render('Admin/Blogs/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'description' => ['required', 'string'],
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'status' => ['required', 'boolean'], // Boolean from frontend switch
            'category_id' => ['required', 'exists:categories,id'],
            'is_published' => ['required', 'boolean'],
            'published_at' => ['nullable', 'date'],
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('blogs', 'public');
            $validatedData['image'] = $imagePath;
        }

        $validatedData['user_id'] = Auth::id(); // Set user_id to current authenticated user

        // Handle published_at based on is_published
        if ($validatedData['is_published'] && empty($validatedData['published_at'])) {
            $validatedData['published_at'] = Carbon::now();
        } elseif (!$validatedData['is_published']) {
            $validatedData['published_at'] = null;
        }

        $validatedData['slug'] = Str::slug($validatedData['title']);

        Blog::create($validatedData);

        return Redirect::route('admin.blogs.index')
            ->with('success', 'Blog created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function destroy(Blog $blog)
    {
        // Delete associated image
        if ($blog->image) {
            Storage::disk('public')->delete($blog->image);
        }

        $blog->delete();

        return Redirect::route('admin.blogs.index')
            ->with('success', 'Blog deleted successfully.');
    }

    public function show(Blog $blog)
    {
        $blog->load('user', 'category', 'blog_photos'); // Eager load relationships
        return Inertia::render('Admin/Blogs/Show', ['blog' => $blog]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        $categories = Category::all(['id', 'name']);
        return Inertia::render('Admin/Blogs/Edit', [
            'blog' => $blog,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'description' => ['required', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'status' => ['required', 'boolean'],
            'category_id' => ['required', 'exists:categories,id'],
            'is_published' => ['required', 'boolean'],
            'published_at' => ['nullable', 'date'],
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($blog->image) {
                Storage::disk('public')->delete($blog->image);
            }
            $imagePath = $request->file('image')->store('blogs', 'public');
            $validatedData['image'] = $imagePath;
        } else {
            // If no new image is uploaded, retain the old one
            $validatedData['image'] = $blog->image;
        }

        // Handle published_at based on is_published
        if ($validatedData['is_published'] && empty($validatedData['published_at'])) {
            $validatedData['published_at'] = Carbon::now();
        } elseif (!$validatedData['is_published']) {
            $validatedData['published_at'] = null;
        }

        $validatedData['slug'] = Str::slug($validatedData['title']);

        $blog->update($validatedData);

        return Redirect::route('admin.blogs.index')
            ->with('success', 'Blog updated successfully.');
    }
}

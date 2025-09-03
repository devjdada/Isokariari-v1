<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogPhotoController extends Controller
{
    public function index(Blog $blog)
    {
        $blog->load('blog_photos');
        return Inertia::render('Admin/BlogPhotos/Index', [
            'blog' => $blog,
        ]);
    }

    public function create(Blog $blog)
    {
        return Inertia::render('Admin/BlogPhotos/Create', ['blog' => $blog]);
    }

    public function store(Request $request, Blog $blog)
    {
        $request->validate([
            'images' => ['required', 'array'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('blog_photos', 'public');
                $blog->blog_photos()->create(['image' => $imagePath]);
            }
        }

        return Redirect::route('admin.blogs.photos.index', $blog->id)
            ->with('success', 'Photos uploaded successfully.');
    }

    public function destroy(BlogPhoto $photo)
    {
        $blogId = $photo->blogId;
        Storage::disk('public')->delete($photo->image);
        $photo->delete();

        return Redirect::route('admin.blogs.photos.index', $blogId)
            ->with('success', 'Photo deleted successfully.');
    }
}

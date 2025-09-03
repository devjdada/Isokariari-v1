<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublicBlogController extends Controller
{
    public function index()
    {
        $blogPosts = Blog::with('category', 'user')->latest()->get()->map(function ($blogPost) {
            $blogPost->image = Storage::url($blogPost->image);
            return $blogPost;
        });
        $categories = Category::all();

        return Inertia::render('Blogs/Index', [
            'blogPosts' => $blogPosts,
            'allCat' => $categories,
        ]);
    }

    public function show(Blog $blog)
    {
        $blog->load(['category', 'blog_photos', 'user']);

        $blog->image = Storage::url($blog->image);

        $blog->blog_photos->map(function ($photo) {
            $photo->image = Storage::url($photo->image);
            return $photo;
        });

        $posts = Blog::with('category')
            ->where('id', '!=', $blog->id)
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($post) {
                $post->image = Storage::url($post->image);
                return $post;
            });

        return Inertia::render('Blogs/Show', [
            'blogPost' => $blog,
            'posts' => $posts,
        ]);
    }
}

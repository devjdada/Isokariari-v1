<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        $pages = Page::where('status', true)->latest()->get()->map(function ($page) {
            if ($page->image) {
                $page->image = Storage::url($page->image);
            }
            return $page;
        });
        return Inertia::render('Pages/Index', ['pages' => $pages]);
    }

    public function show(Page $page)
    {
        $page->load('images');

        if ($page->image) {
            $page->image = Storage::url($page->image);
        }

        $page->images->map(function ($image) {
            $image->image = Storage::url($image->image);
            return $image;
        });

        $posts = Blog::latest()->take(3)->get()->map(function ($blogPost) {
            $blogPost->image = Storage::url($blogPost->image);
            return $blogPost;
        });

        return Inertia::render('Pages/Show', [
            'page' => $page,
            'posts' => $posts,
        ]);
    }
}

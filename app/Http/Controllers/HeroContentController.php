<?php

namespace App\Http\Controllers;

use App\Models\HeroContent;
use Inertia\Inertia;

class HeroContentController extends Controller
{
    public function index()
    {
        $heroContents = HeroContent::latest()->get();
        return Inertia::render('HeroContents/Index', ['heroContents' => $heroContents]);
    }

    public function show(HeroContent $heroContent)
    {
        return Inertia::render('HeroContents/Show', ['heroContent' => $heroContent]);
    }
}

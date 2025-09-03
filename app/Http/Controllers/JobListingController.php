<?php

namespace App\Http\Controllers;

use App\Models\JobListing;
use App\Models\Photo;
use Inertia\Inertia;

class JobListingController extends Controller
{
    public function index()
    {
        $galleries = Photo::where('gallery', 'careers')->get();
        $jobListings = JobListing::where('is_active', true)->latest()->get();
        return Inertia::render('JobListings/Index', ['jobListings' => $jobListings, 'galleries' => $galleries]);
    }

    public function show(JobListing $jobListing)
    {
        return Inertia::render('JobListings/Show', ['jobListing' => $jobListing]);
    }
}

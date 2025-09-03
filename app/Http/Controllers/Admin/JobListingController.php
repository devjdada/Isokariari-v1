<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobListing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobListingController extends Controller
{
    public function index()
    {
        $jobListings = JobListing::latest()->paginate(10);
        return Inertia::render('Admin/JobListings/Index', ['jobListings' => $jobListings->items()]);
    }

    public function create()
    {
        return Inertia::render('Admin/JobListings/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'responsibilities' => 'required|string',
            'is_active' => 'boolean',
            'closing_date' => 'nullable|date',
            'posted_date' => 'nullable|date',
        ]);

        JobListing::create($validatedData);

        return redirect()->route('admin.job-listings.index')->with('success', 'Job Listing created successfully.');
    }

    public function show(JobListing $jobListing)
    {
        return Inertia::render('Admin/JobListings/Show', ['jobListing' => $jobListing]);
    }

    public function edit(JobListing $jobListing)
    {
        return Inertia::render('Admin/JobListings/Edit', ['jobListing' => $jobListing]);
    }

    public function update(Request $request, JobListing $jobListing)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'responsibilities' => 'required|string',
            'is_active' => 'boolean',
            'closing_date' => 'nullable|date',
            'posted_date' => 'nullable|date',
        ]);

        $jobListing->update($validatedData);

        return redirect()->route('admin.job-listings.index')->with('success', 'Job Listing updated successfully.');
    }

    public function destroy(JobListing $jobListing)
    {
        $jobListing->delete();

        return redirect()->route('admin.job-listings.index')->with('success', 'Job Listing deleted successfully.');
    }
}
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $applications = Application::with('jobListing')->latest()->get()->map(function ($application) {
            $application->cv = Storage::url($application->getRawOriginal('cv'));
            $application->letter = Storage::url($application->getRawOriginal('letter'));
            return $application;
        });

        return Inertia::render('Admin/Applications/Index', [
            'applications' => $applications,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Application $application)
    {
        $application->load('jobListing');
      
        return Inertia::render('Admin/Applications/Show', [
            'application' => $application,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Application $application)
    {
        if ($application->cv && Storage::disk('public')->exists($application->getRawOriginal('cv'))) {
            Storage::disk('public')->delete($application->getRawOriginal('cv'));
        }
        if ($application->letter && Storage::disk('public')->exists($application->getRawOriginal('letter'))) {
            Storage::disk('public')->delete($application->getRawOriginal('letter'));
        }

        $application->delete();

        return redirect()->route('admin.applications.index')->with('success', 'Application deleted successfully.');
    }

    // create and store methods are not needed for admin side as applications are submitted from public side
    public function create()
    {
        // Not needed
    }

    public function store(Request $request)
    {
        // Not needed
    }

    public function edit(Application $application)
    {
        // Not needed
    }

    public function update(Request $request, Application $application)
    {
        // Not needed
    }
}
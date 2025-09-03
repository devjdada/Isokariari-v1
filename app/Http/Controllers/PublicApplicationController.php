<?php

namespace App\Http\Controllers;

use App\Mail\ApplicationSubmitted;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class PublicApplicationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_listings_id' => 'nullable|exists:job_listings,id',
            'full_name'       => 'required|string|min:2',
            'email'           => 'required|email',
            'phone'           => 'required|min:10',
            'pay'             => 'required|min:3',
            'location'        => 'required|min:3',
            'cover'           => 'required|min:5',
            'cv'              => 'required|file|mimes:pdf|max:2048',
            'letter'          => 'required|file|mimes:pdf|max:2048',
        ]);

        $validated['cv'] = $request->file('cv')->store('applications/cv', 'public');
        $validated['letter'] = $request->file('letter')->store('applications/letter', 'public');

        $application = new Application();
        $application->job_listings_id = $validated['job_listings_id'] ?? null;
        $application->full_name = $validated['full_name'];
        $application->email = $validated['email'];
        $application->phone = $validated['phone'];
        $application->pay = $validated['pay'];
        $application->location = $validated['location'];
        $application->cover = $validated['cover'];
        $application->cv = $validated['cv'];
        $application->letter = $validated['letter'];
        $application->save();

        Mail::to('vacancies@okisokariari.com')->send(new ApplicationSubmitted($application));

        return back()->with('success', 'Application submitted successfully!');
    }
}

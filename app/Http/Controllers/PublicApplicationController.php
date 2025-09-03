<?php

namespace App\Http\Controllers;


use App\Models\Application;
use Illuminate\Http\Request;

class PublicApplicationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_id'    => 'nullable|exists:jobs,id',
            'full_name' => 'required|string|min:2',
            'email'     => 'required|email',
            'phone'     => 'required|min:10',
            'pay'       => 'required|min:3',
            'location'  => 'required|min:3',
            'cover'     => 'required|min:5',
            'cv'        => 'required|file|mimes:pdf|max:2048',
            'letter'    => 'required|file|mimes:pdf|max:2048',
        ]);

        $validated['cv'] = $request->file('cv')->store('applications/cv', 'public');
        $validated['letter'] = $request->file('letter')->store('applications/letter', 'public');

        Application::create($validated);

        return back()->with('success', 'Application submitted successfully!');
    }
}

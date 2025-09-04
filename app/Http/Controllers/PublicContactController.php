<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormSubmitted;
use App\Models\About;
use App\Models\Branch;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublicContactController extends Controller
{
    public function index()
    {
        $about = About::first();
        $branches = Branch::latest()->get();
        $galleries = Photo::latest()->get();

        return Inertia::render('Contact/Index', [
            'about' => $about,
            'branches' => $branches,
            'galleries' => $galleries,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'phone'   => 'nullable|string|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        Mail::to('vacancies@okisokariari.com')->send(new ContactFormSubmitted($data));

        return redirect()->back()->with('success', 'Message sent successfully!');
    }
}

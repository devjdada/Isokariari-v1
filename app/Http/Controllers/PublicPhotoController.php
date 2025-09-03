<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublicPhotoController extends Controller
{
    public function index()
    {
        $photos = Photo::latest()->get();

        return Inertia::render('Photos/Index', [
            'photos' => $photos,
        ]);
    }
}

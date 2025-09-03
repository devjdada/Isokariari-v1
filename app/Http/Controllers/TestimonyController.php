<?php

namespace App\Http\Controllers;

use App\Models\Testimony;
use Inertia\Inertia;

class TestimonyController extends Controller
{
    public function index()
    {
        $testimonies = Testimony::latest()->get();
        return Inertia::render('Testimonies/Index', ['testimonies' => $testimonies]);
    }

    public function show(Testimony $testimony)
    {
        return Inertia::render('Testimonies/Show', ['testimony' => $testimony]);
    }
}

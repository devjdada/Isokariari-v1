<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublicServiceController extends Controller
{
    public function index()
    {
        $services = Service::latest()->get()->map(function ($service) {
            $service->image = Storage::url($service->image);
            return $service;
        });

        return Inertia::render('Services/Index', [
            'services' => $services,
        ]);
    }
}
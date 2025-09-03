<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublicServiceShowController extends Controller
{
    public function show(Service $service)
    {
        $service->image = Storage::url($service->image);

        $relatedServices = Service::where('id', '!=', $service->id)
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($relatedService) {
                $relatedService->image = Storage::url($relatedService->image);
                return $relatedService;
            });

        return Inertia::render('Services/Show', [
            'service' => $service,
            'relatedServices' => $relatedServices,
        ]);
    }
}
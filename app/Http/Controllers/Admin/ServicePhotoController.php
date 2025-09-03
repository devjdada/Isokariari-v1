<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServicePhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ServicePhotoController extends Controller
{
    public function index(Service $service)
    {
        $servicePhotos = $service->photos()->get();
        return Inertia::render('Admin/ServicePhotos/Index', [
            'service' => $service,
            'servicePhotos' => $servicePhotos,
        ]);
    }

    public function store(Request $request, Service $service)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        foreach ($request->file('images') as $image) {
            $imagePath = $image->store('service_photos', 'public');
            $service->photos()->create([
                'image' => $imagePath,
            ]);
        }

        return redirect()->back()->with('success', 'Photos added successfully.');
    }

    public function destroy(Service $service, ServicePhoto $photo)
    {
        if ($photo->serviceId !== $service->id) {
            abort(403, 'Unauthorized action.');
        }

        Storage::disk('public')->delete($photo->image);
        $photo->delete();

        return redirect()->back()->with('success', 'Photo deleted successfully.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipmentController extends Controller
{
    public function index()
    {
        $equipments = Equipment::latest()->get();
        return Inertia::render('Admin/Equipment/Index', ['equipments' => $equipments]);
    }

    public function create()
    {
        return Inertia::render('Admin/Equipment/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'link' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('equipment', 'public');
            $validatedData['image'] = $imagePath;
        }

        Equipment::create($validatedData);

        return redirect()->route('admin.equipment.index')->with('success', 'Equipment created successfully.');
    }

    public function show(Equipment $equipment)
    {
        return Inertia::render('Admin/Equipment/Show', ['equipment' => $equipment]);
    }

    public function edit(Equipment $equipment)
    {
        return Inertia::render('Admin/Equipment/Edit', ['equipment' => $equipment]);
    }

    public function update(Request $request, Equipment $equipment)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'link' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($equipment->image) {
                Storage::disk('public')->delete($equipment->image);
            }
            $imagePath = $request->file('image')->store('equipment', 'public');
            $validatedData['image'] = $imagePath;
        } else {
            // If no new image is uploaded, retain the old one
            $validatedData['image'] = $equipment->image;
        }

        $equipment->update($validatedData);

        return redirect()->route('admin.equipment.index')->with('success', 'Equipment updated successfully.');
    }

    public function destroy(Equipment $equipment)
    {
        // Delete associated image
        if ($equipment->image) {
            Storage::disk('public')->delete($equipment->image);
        }

        $equipment->delete();

        return redirect()->route('admin.equipment.index')->with('success', 'Equipment deleted successfully.');
    }
}
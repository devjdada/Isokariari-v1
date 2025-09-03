<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Inertia\Inertia;

class BranchController extends Controller
{
    public function index()
    {
        $branches = Branch::latest()->get();
        return Inertia::render('Branches/Index', ['branches' => $branches]);
    }

    public function show(Branch $branch)
    {
        return Inertia::render('Branches/Show', ['branch' => $branch]);
    }
}

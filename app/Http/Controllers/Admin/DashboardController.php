<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Blog;
use App\Models\Service;
use App\Models\Page;
use App\Models\JobListing;
use App\Models\Client;
use App\Models\Team;
use App\Models\Testimony;
use App\Models\Equipment;
use App\Models\Branch;
use App\Models\Category;
use App\Models\User;
use App\Models\Application;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $data = [
            'projectsCount' => Project::count(),
            'blogsCount' => Blog::count(),
            'servicesCount' => Service::count(),
            'pagesCount' => Page::count(),
            'jobListingsCount' => JobListing::count(),
            'clientsCount' => Client::count(),
            'teamsCount' => Team::count(),
            'testimoniesCount' => Testimony::count(),
            'equipmentCount' => Equipment::count(),
            'branchesCount' => Branch::count(),
            'categoriesCount' => Category::count(),
            'usersCount' => User::count(),
            'applicationsCount' => Application::count(),
        ];

        return Inertia::render('dashboard', $data);
    }
}

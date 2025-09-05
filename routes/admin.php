<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\BlogPhotoController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\JobListingController;
use App\Http\Controllers\Admin\ApplicationController;
use App\Http\Middleware\RoleMiddleware;

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    // Admin Dashboard - Accessible by all authenticated users for now, can be restricted later
    Route::get('/', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

    // TEST ROUTE FOR ADMIN ACCESS
    Route::get('test-access', function () {
        return 'Admin prefix access granted!';
    })->name('test-access');

    // Profile Management (Accessible by 'user' role and 'admin')
    Route::get('profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::post('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('profile/password', [ProfileController::class, 'updatePassword'])->name('profile.updatePassword');
    Route::post('profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.updateAvatar');



    // Editor Routes (View all, Edit/Update Project, Blog, Service)
    Route::middleware([RoleMiddleware::class . ':editor'])->group(function () {
        // Projects
        Route::get('projects', [App\Http\Controllers\Admin\ProjectController::class, 'index'])->name('projects.index');
        Route::get('projects/{project}/edit', [App\Http\Controllers\Admin\ProjectController::class, 'edit'])->name('projects.edit');
        Route::put('projects/{project}', [App\Http\Controllers\Admin\ProjectController::class, 'update'])->name('projects.update');
        // Blogs
        Route::get('blogs', [BlogController::class, 'index'])->name('blogs.index');
        Route::get('blogs/{blog}/edit', [BlogController::class, 'edit'])->name('blogs.edit');
        Route::put('blogs/{blog}', [BlogController::class, 'update'])->name('blogs.update');
        // Services
        Route::get('services', [App\Http\Controllers\Admin\ServiceController::class, 'index'])->name('services.index');
        Route::get('services/{service}/edit', [App\Http\Controllers\Admin\ServiceController::class, 'edit'])->name('services.edit');
        Route::put('services/{service}', [App\Http\Controllers\Admin\ServiceController::class, 'update'])->name('services.update');
    });

    // HR Routes (View all, Edit/Update/Delete JobListing, Application)
    Route::middleware([RoleMiddleware::class . ':hr'])->group(function () {
        // Job Listings (HR can view, edit, update, delete)
        Route::get('job-listings', [JobListingController::class, 'index'])->name('job-listings.index');
        Route::get('job-listings/{job_listing}/edit', [JobListingController::class, 'edit'])->name('job-listings.edit');
        Route::put('job-listings/{job_listing}', [JobListingController::class, 'update'])->name('job-listings.update');
        Route::delete('job-listings/{job_listing}', [JobListingController::class, 'destroy'])->name('job-listings.destroy');
        // Applications (HR can view, show, delete)
        Route::get('applications', [ApplicationController::class, 'index'])->name('applications.index');
        Route::get('applications/{application}', [ApplicationController::class, 'show'])->name('applications.show');
        Route::delete('applications/{application}', [ApplicationController::class, 'destroy'])->name('applications.destroy');
    });

    // Admin Only Routes (Full Access)
    Route::middleware([RoleMiddleware::class . ':admin'])->group(function () {
        Route::resource('projects', App\Http\Controllers\Admin\ProjectController::class);
        Route::resource('projects.more-projects', App\Http\Controllers\Admin\MoreProjectController::class);
        Route::resource('projects.photos', App\Http\Controllers\Admin\ProjectPhotoController::class);
        Route::resource('blogs', BlogController::class);
        Route::resource('blogs.photos', BlogPhotoController::class)->shallow()->except(['show', 'edit', 'update']);
        Route::resource('services', App\Http\Controllers\Admin\ServiceController::class);
        Route::resource('services.photos', App\Http\Controllers\Admin\ServicePhotoController::class);
        Route::resource('pages', App\Http\Controllers\Admin\PageController::class);
        Route::resource('pages.images', App\Http\Controllers\Admin\PageImageController::class)->shallow()->except(['show', 'edit', 'update']);
        Route::resource('clients', App\Http\Controllers\Admin\ClientController::class);
        Route::resource('teams', App\Http\Controllers\Admin\TeamController::class);
        Route::resource('testimonies', App\Http\Controllers\Admin\TestimonyController::class);
        Route::resource('equipment', App\Http\Controllers\Admin\EquipmentController::class);
        Route::resource('branches', App\Http\Controllers\Admin\BranchController::class);
        Route::resource('categories', App\Http\Controllers\Admin\CategoryController::class);
        Route::get('company-info', [App\Http\Controllers\Admin\CompanyInfoController::class, 'manage'])->name('company-info.manage');
        Route::put('company-info', [App\Http\Controllers\Admin\CompanyInfoController::class, 'update'])->name('company-info.update');
        Route::resource('hero-contents', App\Http\Controllers\Admin\HeroContentController::class);
        Route::resource('photos', App\Http\Controllers\Admin\PhotoController::class);
        Route::get('about', [App\Http\Controllers\Admin\AboutController::class, 'manage'])->name('about.manage');
        Route::post('about', [App\Http\Controllers\Admin\AboutController::class, 'update'])->name('about.update');
        Route::resource('users', App\Http\Controllers\Admin\UserController::class)->except(['create', 'store']);

        // Admin has full CRUD for job-listings and applications
        Route::resource('job-listings', JobListingController::class);
        Route::resource('applications', ApplicationController::class); // Admin has full CRUD
    });
});

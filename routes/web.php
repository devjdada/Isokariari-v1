<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\HomeController;

Route::get('/', HomeController::class)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');
    Route::get('dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
});

use App\Http\Controllers\PublicProjectController;

Route::get('/projects', [PublicProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{project:slug}', [PublicProjectController::class, 'show'])->name('projects.show');


use App\Http\Controllers\PublicBlogController;

Route::get('/blogs', [PublicBlogController::class, 'index'])->name('blogs.index');
Route::get('/blogs/{blog:slug}', [PublicBlogController::class, 'show'])->name('blogs.show');

use App\Http\Controllers\PublicServiceController;

Route::get('/services', [PublicServiceController::class, 'index'])->name('services.index');

use App\Http\Controllers\PublicServiceShowController;

Route::get('/services/{service:slug}', [PublicServiceShowController::class, 'show'])->name('services.show');

use App\Http\Controllers\PageController;

// ... other routes

Route::get('/pages', [PageController::class, 'index'])->name('pages.index');
Route::get('/pages/{page:slug}', [PageController::class, 'show'])->name('pages.show');

use App\Http\Controllers\JobListingController;

// ... other routes

Route::get('/careers', [JobListingController::class, 'index'])->name('careers.index');
Route::get('/careers/{jobListing:slug}', [JobListingController::class, 'show'])->name('careers.show');

use App\Http\Controllers\PublicClientController;

Route::get('/clients', [PublicClientController::class, 'index'])->name('clients.index');
Route::get('/clients/{client:slug}', [PublicClientController::class, 'show'])->name('clients.show');

use App\Http\Controllers\TeamController;

// ... other routes

Route::get('/teams', [TeamController::class, 'index'])->name('teams.index');
Route::get('/teams/{team}', [TeamController::class, 'show'])->name('teams.show');

use App\Http\Controllers\TestimonyController;

// ... other routes

Route::get('/testimonies', [TestimonyController::class, 'index'])->name('testimonies.index');
Route::get('/testimonies/{testimony}', [TestimonyController::class, 'show'])->name('testimonies.show');

use App\Http\Controllers\EquipmentController;

// ... other routes

Route::get('/equipment', [EquipmentController::class, 'index'])->name('equipment.index');
Route::get('/equipment/{equipment}', [EquipmentController::class, 'show'])->name('equipment.show');

use App\Http\Controllers\BranchController;
use App\Http\Controllers\HeroContentController;
use App\Http\Controllers\PublicAboutController;

// ... other routes

Route::get('/branches', [BranchController::class, 'index'])->name('branches.index');
Route::get('/branches/{branch}', [BranchController::class, 'show'])->name('branches.show');

Route::get('/categories', function () {
    return Inertia::render('PublicCategories/Index');
})->name('categories.index');

Route::get('/categories/{category}', function () {
    return Inertia::render('PublicCategories/Show');
})->name('categories.show');

Route::get('/company-infos', function () {
    return Inertia::render('PublicCompanyInfos/Index');
})->name('company-infos.index');

Route::get('/company-infos/{companyInfo}', function () {
    return Inertia::render('PublicCompanyInfos/Show');
})->name('company-infos.show');

use App\Http\Controllers\PublicPhotoController;
use App\Http\Controllers\PublicApplicationController;
use App\Http\Controllers\PublicContactController;

// ... other routes

Route::get('/about', [PublicAboutController::class, 'index'])->name('about.index');
Route::get('/hero-contents', [HeroContentController::class, 'index'])->name('hero-contents.index');
Route::get('/hero-contents/{heroContent}', [HeroContentController::class, 'show'])->name('hero-contents.show');
Route::get('/gallery', [PublicPhotoController::class, 'index'])->name('gallery.index');
Route::post('/applications', [PublicApplicationController::class, 'store'])->name('applications.store');
Route::get('/contact', [PublicContactController::class, 'index'])->name('contact.index');
Route::post('/contact-form', [PublicContactController::class, 'store'])->name('contact.store');

require __DIR__ . '/admin.php';

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

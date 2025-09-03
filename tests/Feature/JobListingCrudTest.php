<?php

use App\Models\User;
use App\Models\JobListing;
use Illuminate\Support\Facades\Artisan;

beforeEach(function () {
    Artisan::call('migrate');
});

// Admin tests
test('admin can view job listings list', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user)
        ->get(route('admin.job-listings.index'))
        ->assertOk();
});

test('admin can see create job listing form', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user)
        ->get(route('admin.job-listings.create'))
        ->assertOk();
});

test('admin can create a job listing', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $jobListingData = JobListing::factory()->make()->toArray();

    $this->actingAs($user)
        ->post(route('admin.job-listings.store'), $jobListingData)
        ->assertRedirect(route('admin.job-listings.index'));

    $this->assertDatabaseHas('job_listings', $jobListingData);
});

test('admin can see edit job listing form', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $jobListing = JobListing::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.job-listings.edit', $jobListing))
        ->assertOk();
});

test('admin can update a job listing', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $jobListing = JobListing::factory()->create();
    $updatedData = JobListing::factory()->make()->toArray();

    $this->actingAs($user)
        ->put(route('admin.job-listings.update', $jobListing), $updatedData)
        ->assertRedirect(route('admin.job-listings.index'));

    $this->assertDatabaseHas('job_listings', $updatedData);
});

test('admin can delete a job listing', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $jobListing = JobListing::factory()->create();

    $this->actingAs($user)
        ->delete(route('admin.job-listings.destroy', $jobListing))
        ->assertRedirect(route('admin.job-listings.index'));

    $this->assertDatabaseMissing('job_listings', ['id' => $jobListing->id]);
});

// Public tests
test('public user can view job listings list', function () {
    $this->get(route('job-listings.index'))->assertOk();
});

test('public user can view a single job listing', function () {
    $jobListing = JobListing::factory()->create(['status' => true]);
    $this->get(route('job-listings.show', $jobListing->slug))->assertOk();
});

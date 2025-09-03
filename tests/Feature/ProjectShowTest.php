<?php

use App\Models\User;
use App\Models\Project;
use Illuminate\Support\Facades\Artisan;

beforeEach(function () {
    Artisan::call('migrate');
});

test('admin can view a single project', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $project = Project::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.projects.show', $project->id))
        ->assertOk();
});

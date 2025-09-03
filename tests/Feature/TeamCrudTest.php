<?php

use App\Models\User;
use App\Models\Team;
use Illuminate\Support\Facades\Artisan;

beforeEach(function () {
    Artisan::call('migrate');
});

// Admin tests
test('admin can view teams list', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user)
        ->get(route('admin.teams.index'))
        ->assertOk();
});

test('admin can see create team form', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user)
        ->get(route('admin.teams.create'))
        ->assertOk();
});

test('admin can create a team', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $teamData = Team::factory()->make()->toArray();

    $this->actingAs($user)
        ->post(route('admin.teams.store'), $teamData)
        ->assertRedirect(route('admin.teams.index'));

    $this->assertDatabaseHas('teams', $teamData);
});

test('admin can see edit team form', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $team = Team::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.teams.edit', $team))
        ->assertOk();
});

test('admin can update a team', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $team = Team::factory()->create();
    $updatedData = Team::factory()->make()->toArray();

    $this->actingAs($user)
        ->put(route('admin.teams.update', $team), $updatedData)
        ->assertRedirect(route('admin.teams.index'));

    $this->assertDatabaseHas('teams', $updatedData);
});

test('admin can delete a team', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $team = Team::factory()->create();

    $this->actingAs($user)
        ->delete(route('admin.teams.destroy', $team))
        ->assertRedirect(route('admin.teams.index'));

    $this->assertDatabaseMissing('teams', ['id' => $team->id]);
});

// Public tests
test('public user can view teams list', function () {
    $this->get(route('teams.index'))->assertOk();
});

test('public user can view a single team', function () {
    $team = Team::factory()->create();
    $this->get(route('teams.show', $team->id))->assertOk();
});

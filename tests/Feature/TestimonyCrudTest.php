<?php

use App\Models\User;
use App\Models\Testimony;
use Illuminate\Support\Facades\Artisan;

beforeEach(function () {
    Artisan::call('migrate');
});

// Admin tests
test('admin can view testimonies list', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user)
        ->get(route('admin.testimonies.index'))
        ->assertOk();
});

test('admin can see create testimony form', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user)
        ->get(route('admin.testimonies.create'))
        ->assertOk();
});

test('admin can create a testimony', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $testimonyData = Testimony::factory()->make()->toArray();

    $this->actingAs($user)
        ->post(route('admin.testimonies.store'), $testimonyData)
        ->assertRedirect(route('admin.testimonies.index'));

    $this->assertDatabaseHas('testimonies', $testimonyData);
});

test('admin can see edit testimony form', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $testimony = Testimony::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.testimonies.edit', $testimony))
        ->assertOk();
});

test('admin can update a testimony', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $testimony = Testimony::factory()->create();
    $updatedData = Testimony::factory()->make()->toArray();

    $this->actingAs($user)
        ->put(route('admin.testimonies.update', $testimony), $updatedData)
        ->assertRedirect(route('admin.testimonies.index'));

    $this->assertDatabaseHas('testimonies', $updatedData);
});

test('admin can delete a testimony', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $testimony = Testimony::factory()->create();

    $this->actingAs($user)
        ->delete(route('admin.testimonies.destroy', $testimony))
        ->assertRedirect(route('admin.testimonies.index'));

    $this->assertDatabaseMissing('testimonies', ['id' => $testimony->id]);
});

// Public tests
test('public user can view testimonies list', function () {
    $this->get(route('testimonies.index'))->assertOk();
});

test('public user can view a single testimony', function () {
    $testimony = Testimony::factory()->create();
    $this->get(route('testimonies.show', $testimony->id))->assertOk();
});

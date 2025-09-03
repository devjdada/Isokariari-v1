<?php

use App\Models\User;
use App\Models\Branch;
use Illuminate\Support\Facades\Artisan;

beforeEach(function () {
    Artisan::call('migrate');
});

// Admin tests
test('admin can view branches list', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user)
        ->get(route('admin.branches.index'))
        ->assertOk();
});

test('admin can see create branch form', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user)
        ->get(route('admin.branches.create'))
        ->assertOk();
});

test('admin can create a branch', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $branchData = Branch::factory()->make()->toArray();

    $this->actingAs($user)
        ->post(route('admin.branches.store'), $branchData)
        ->assertRedirect(route('admin.branches.index'));

    $this->assertDatabaseHas('branches', $branchData);
});

test('admin can see edit branch form', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $branch = Branch::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.branches.edit', $branch))
        ->assertOk();
});

test('admin can update a branch', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $branch = Branch::factory()->create();
    $updatedData = Branch::factory()->make()->toArray();

    $this->actingAs($user)
        ->put(route('admin.branches.update', $branch), $updatedData)
        ->assertRedirect(route('admin.branches.index'));

    $this->assertDatabaseHas('branches', $updatedData);
});

test('admin can delete a branch', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $branch = Branch::factory()->create();

    $this->actingAs($user)
        ->delete(route('admin.branches.destroy', $branch))
        ->assertRedirect(route('admin.branches.index'));

    $this->assertDatabaseMissing('branches', ['id' => $branch->id]);
});

// Public tests
test('public user can view branches list', function () {
    $this->get(route('branches.index'))->assertOk();
});

test('public user can view a single branch', function () {
    $branch = Branch::factory()->create();
    $this->get(route('branches.show', $branch->id))->assertOk();
});

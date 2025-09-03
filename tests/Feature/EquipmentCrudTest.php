<?php

use App\Models\User;
use App\Models\Equipment;
use Illuminate\Support\Facades\Artisan;

beforeEach(function () {
    Artisan::call('migrate');
});

// Admin tests
test('admin can view equipments list', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user)
        ->get(route('admin.equipment.index'))
        ->assertOk();
});

test('admin can see create equipment form', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user)
        ->get(route('admin.equipment.create'))
        ->assertOk();
});

test('admin can create an equipment', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $equipmentData = Equipment::factory()->make()->toArray();

    $this->actingAs($user)
        ->post(route('admin.equipment.store'), $equipmentData)
        ->assertRedirect(route('admin.equipment.index'));

    $this->assertDatabaseHas('equipment', $equipmentData);
});

test('admin can see edit equipment form', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $equipment = Equipment::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.equipment.edit', $equipment))
        ->assertOk();
});

test('admin can update an equipment', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $equipment = Equipment::factory()->create();
    $updatedData = Equipment::factory()->make()->toArray();

    $this->actingAs($user)
        ->put(route('admin.equipment.update', $equipment), $updatedData)
        ->assertRedirect(route('admin.equipment.index'));

    $this->assertDatabaseHas('equipment', $updatedData);
});

test('admin can delete an equipment', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $equipment = Equipment::factory()->create();

    $this->actingAs($user)
        ->delete(route('admin.equipment.destroy', $equipment))
        ->assertRedirect(route('admin.equipment.index'));

    $this->assertDatabaseMissing('equipment', ['id' => $equipment->id]);
});

// Public tests
test('public user can view equipments list', function () {
    $this->get(route('equipment.index'))->assertOk();
});

test('public user can view a single equipment', function () {
    $equipment = Equipment::factory()->create();
    $this->get(route('equipment.show', $equipment->id))->assertOk();
});

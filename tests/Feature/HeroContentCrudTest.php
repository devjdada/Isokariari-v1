<?php

use App\Models\User;
use App\Models\HeroContent;
use Illuminate\Support\Facades\Artisan;

beforeEach(function () {
    Artisan::call('migrate');
});

// Admin tests
test('admin can view hero contents list', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user)
        ->get(route('admin.hero-contents.index'))
        ->assertOk();
});

test('admin can see create hero content form', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user)
        ->get(route('admin.hero-contents.create'))
        ->assertOk();
});

test('admin can create a hero content', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $heroContentData = HeroContent::factory()->make()->toArray();

    $this->actingAs($user)
        ->post(route('admin.hero-contents.store'), $heroContentData)
        ->assertRedirect(route('admin.hero-contents.index'));

    $this->assertDatabaseHas('hero_contents', $heroContentData);
});

test('admin can see edit hero content form', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $heroContent = HeroContent::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.hero-contents.edit', $heroContent))
        ->assertOk();
});

test('admin can update a hero content', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $heroContent = HeroContent::factory()->create();
    $updatedData = HeroContent::factory()->make()->toArray();

    $this->actingAs($user)
        ->put(route('admin.hero-contents.update', $heroContent), $updatedData)
        ->assertRedirect(route('admin.hero-contents.index'));

    $this->assertDatabaseHas('hero_contents', $updatedData);
});

test('admin can delete a hero content', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $heroContent = HeroContent::factory()->create();

    $this->actingAs($user)
        ->delete(route('admin.hero-contents.destroy', $heroContent))
        ->assertRedirect(route('admin.hero-contents.index'));

    $this->assertDatabaseMissing('hero_contents', ['id' => $heroContent->id]);
});

// Public tests
test('public user can view hero contents list', function () {
    $this->get(route('hero-contents.index'))->assertOk();
});

test('public user can view a single hero content', function () {
    $heroContent = HeroContent::factory()->create();
    $this->get(route('hero-contents.show', $heroContent->id))->assertOk();
});

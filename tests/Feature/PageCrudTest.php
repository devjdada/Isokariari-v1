<?php

use App\Models\User;
use App\Models\Page;
use Illuminate\Support\Facades\Artisan;

beforeEach(function () {
    Artisan::call('migrate');
});

// Admin tests
test('admin can view pages list', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user)
        ->get(route('admin.pages.index'))
        ->assertOk();
});

test('admin can see create page form', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user)
        ->get(route('admin.pages.create'))
        ->assertOk();
});

test('admin can create a page', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $pageData = Page::factory()->make()->toArray();

    $this->actingAs($user)
        ->post(route('admin.pages.store'), $pageData)
        ->assertRedirect(route('admin.pages.index'));

    $this->assertDatabaseHas('pages', $pageData);
});

test('admin can see edit page form', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $page = Page::factory()->create();

    $this->actingAs($user)
        ->get(route('admin.pages.edit', $page))
        ->assertOk();
});

test('admin can update a page', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $page = Page::factory()->create();
    $updatedData = Page::factory()->make()->toArray();

    $this->actingAs($user)
        ->put(route('admin.pages.update', $page), $updatedData)
        ->assertRedirect(route('admin.pages.index'));

    $this->assertDatabaseHas('pages', $updatedData);
});

test('admin can delete a page', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $page = Page::factory()->create();

    $this->actingAs($user)
        ->delete(route('admin.pages.destroy', $page))
        ->assertRedirect(route('admin.pages.index'));

    $this->assertDatabaseMissing('pages', ['id' => $page->id]);
});

// Public tests
test('public user can view pages list', function () {
    $this->get(route('pages.index'))->assertOk();
});

test('public user can view a single page', function () {
    $page = Page::factory()->create(['status' => true]);
    $this->get(route('pages.show', $page->slug))->assertOk();
});

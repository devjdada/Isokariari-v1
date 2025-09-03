<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Blog extends Model
{
    protected $fillable = [
        'title',
        'slug', // Added from migration
        'content',
        'description', // Added from migration
        'image', // Added from migration
        'status', // Added from migration
        'user_id',
        'category_id',
        'is_published',
        'published_at',
    ];

    /**
     * Get the user that owns the blog.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category that owns the blog.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function blog_photos()
    {
        return $this->hasMany(BlogPhoto::class, 'blogId');
    }

    /**
     * Get the photos for the blog.
     */
    public function photos(): HasMany
    {
        return $this->hasMany(BlogPhoto::class);
    }
}

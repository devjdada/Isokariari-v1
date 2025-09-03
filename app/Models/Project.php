<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    protected $fillable = [
        'title',
        'description',
        'doc',
        'image',
        'link',
        'location',
        'complete',
        'slug',
        'status',
        'type',
        'category',
        'clientId',
        'post_by',
        'edit_by',
    ];

    /**
     * Get the category for the project.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category', 'id');
    }

    /**
     * Get the photos for the project.
     */
    public function project_photos(): HasMany
    {
        return $this->hasMany(ProjectPhoto::class, 'projectId', 'id');
    }

    /**
     * Get the additional project details.
     */
    public function more_projects(): HasMany
    {
        return $this->hasMany(MoreProject::class, 'projectId', 'id');
    }

    /**
     * Get the client that owns the project.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'clientId', 'id');
    }

    /**
     * Get the user who posted the project.
     */
    public function posted_by(): BelongsTo
    {
        return $this->belongsTo(User::class, 'post_by');
    }

    /**
     * Get the user who last edited the project.
     */
    public function edited_by(): BelongsTo
    {
        return $this->belongsTo(User::class, 'edit_by');
    }
}

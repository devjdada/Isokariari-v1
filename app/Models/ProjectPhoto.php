<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectPhoto extends Model
{
    protected $fillable = [
        'project_id',
        'image',
        'caption',
    ];

    /**
     * Get the project that owns the photo.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'projectId');
    }
}

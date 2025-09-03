<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MoreProject extends Model
{
    protected $fillable = [
        'project_id',
        'doc',
        'image',
        'position',
    ];

    /**
     * Get the project that owns the additional details.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'projectId');
    }
}

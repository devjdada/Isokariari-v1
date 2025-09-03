<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PagePhoto extends Model
{
    protected $fillable = [
        'page_id',
        'photo_path',
        'caption',
    ];

    /**
     * Get the page that owns the photo.
     */
    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'contents',
        'image',
        'slug',
        'more',
        'status',
    ];

    public function images(): HasMany
    {
        return $this->hasMany(PageImage::class, 'pageId');
    }
}

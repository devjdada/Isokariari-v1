<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobListing extends Model
{
    protected $fillable = [
        'title',
        'department',
        'location',
        'description',
        'requirements',
        'responsibilities',
        'is_active',
        'closing_date',
        'posted_date',
    ];

    /**
     * Get the applications for the job listing.
     */
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }
}

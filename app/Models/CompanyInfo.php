<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyInfo extends Model
{
    protected $fillable = [
        'about_content',
        'vision',
        'mission',
        'history',
        'contact_email',
        'contact_phone',
        'address',
        'social_media',
        'meta_description',
        'meta_keywords',
    ];

    protected $casts = [
        'social_media' => 'array',
    ];
}
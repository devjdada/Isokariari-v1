<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $table = 'team'; // Added this line

    protected $fillable = [
        'name',
        'facebook',
        'twitter',
        'linkedin',
        'title',
        'image',
        'email',
        'status',
        'about',
        'order',
    ];
}

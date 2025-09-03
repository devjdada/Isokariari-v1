<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    protected $table = 'equipments'; // Added this line

    protected $fillable = [
        'name',
        'position',
        'company',
        'link',
        'content',
        'image',
    ];
}
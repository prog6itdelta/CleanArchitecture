<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'head',
        'parent'
    ];

    protected $appends = [
        'type'
    ];

    /**
     * Define casbin type.
     *
     * @return string
     */
    public function getTypeAttribute()
    {
        return 'DM';
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

}

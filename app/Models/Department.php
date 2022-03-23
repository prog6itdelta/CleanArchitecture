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
        'type',
        'head_name',
        'parent_name'
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

    public function getHeadNameAttribute()
    {
        return User::find($this->head)->first()->name;
    }

    public function getParentNameAttribute()
    {
        return Department::find($this->parent)->first()->name;
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

}

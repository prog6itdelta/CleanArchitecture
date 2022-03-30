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
        $head = User::find($this->head);
        if (is_null($head)) {
            return $this->first()->name;
        }
        return '';
    }

    public function getParentNameAttribute()
    {
        $parent = Department::find($this->parent);
        if (is_null($parent)) {
            return $this->first()->name;
        }
        return '';
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

}

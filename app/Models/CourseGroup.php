<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseGroup extends Model
{
    use HasFactory;

    protected $table = 'learn_courses';

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}

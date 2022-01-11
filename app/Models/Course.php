<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\SortScope;
use App\Models\Scopes\ActiveScope;

class Course extends Model
{
    use HasFactory;

    protected $table = 'learn_courses';

    public function lessons()
    {
        return $this->belongsToMany(Lesson::class, 'learn_course_lesson');
    }

    protected static function booted()
    {
        static::addGlobalScope(new ActiveScope());
        static::addGlobalScope(new SortScope());
    }
}

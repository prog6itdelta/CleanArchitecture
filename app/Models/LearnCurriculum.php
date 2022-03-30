<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LearnCurriculum extends Model
{
    use HasFactory;

    protected $table = 'learn_course_curriculum';

    protected $fillable = [
        'order'
    ];

    public function course()
    {
        return $this->hasMany(Curriculum::class);
    }

    public function curriculum()
    {
        return $this->hasMany(Course::class);
    }
}

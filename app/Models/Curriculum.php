<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curriculum extends Model
{
    use HasFactory;

    protected $table = 'learn_curriculums';

    protected $fillable = [
        'name',
        'active',
        'description'
    ];

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'learn_course_curriculum')->orderBy('order')->withPivot('order', 'id');
    }
}

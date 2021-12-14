<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curriculum extends Model
{
    use HasFactory;

    protected $table = 'learn_curriculums';

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}

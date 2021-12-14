<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $table = 'learn_lessons';

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}

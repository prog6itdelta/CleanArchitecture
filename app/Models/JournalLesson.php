<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JournalLesson extends Model
{
    use HasFactory;

    protected $table = 'learn_journal_lessons';

    protected $fillable = ['user_id', 'lesson_id', 'instructor_id', 'comment', 'answers', 'status', 'tries'];
}

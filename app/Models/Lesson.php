<?php

namespace App\Models;

use App\Models\Scopes\ActiveScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\SortScope;

class Lesson extends Model
{
    use HasFactory;

    protected $table = 'learn_lessons';

    protected $fillable = [
        'name',
        'active',
        'description',
        'detail_text',
        'options',
    ];

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'learn_course_lesson');
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    protected static function booted()
    {
        static::addGlobalScope(new ActiveScope());
        static::addGlobalScope(new SortScope());
    }
}

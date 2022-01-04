<?php

namespace App\Packages\Learn\UseCases;

use App\Packages\Learn\Entities\JournalLesson;
use App\Packages\Learn\Infrastructure\Repositories\JournalLessonRepository;

class CourseStatus
{
    public const NEW = "new";
    public const IN_PROGRESS = "in_progress";
    public const DONE = "done";
}

class LessonStatus
{
    public const NEW = "new";
    public const IN_PROGRESS = "in_progress";
    public const PENDING = "pending";
    public const DONE = "done";
    public const FAIL = "fail";
}

class QuestionStatus
{
    public const NEW = "new";
    public const PENDING = "pending";
    public const BLOCKED = "blocked";
    public const DONE = "done";
    public const FAIL = "fail";
}


class JournalService
{
    public static function getLesson(int $lid): JournalLesson|null
    {
        $user_id = auth()->user()->id;
        $rep = new JournalLessonRepository();
        $rec = $rep->query(fn ($model) => ( $model->where([
                'user_id' => $user_id,
                'lesson_id' => $lid
            ])))->first();
        return $rec;
    }

    public static function getAnswers(int $lid): array
    {
        $rec = self::getLesson($lid);
        return $rec?->answers ?? [];
    }

    /**
     * Store answers for a lesson
     * @param int $lid
     * @param \stdClass $answers
     */
    public static function storeAnswers(int $lid, array $answers): void
    {
        $rec = self::getLesson($lid);
        $user_id = auth()->user()->id;
        $tries = $rec?->tries ? $rec->tries + 1 : 1;

        $data = [
            'user_id' => $user_id,
            'lesson_id' => $lid,
            'tries' => $tries,
            'answers' => json_encode($answers),
            'status' => 'new'
        ];

        $rep = new JournalLessonRepository();
        if (!$rec)
            $rec = $rep->create($data);
        else
            $rep->update($data, $rec->id);
    }

    public function getCourseStatus(int $id): string
    {
        return CourseStatus::DONE;
    }

    public function getLessonStatus(int $id): string
    {
        return LessonStatus::DONE;
    }

    public function getQuestionStatus(int $id): string
    {
        return QuestionStatus::DONE;
    }
}

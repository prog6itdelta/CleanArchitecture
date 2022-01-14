<?php

namespace App\Packages\Learn\UseCases;

use App\Packages\Learn\Entities\JournalLesson;
use App\Packages\Learn\Entities\Lesson;
use App\Packages\Learn\Infrastructure\Repositories\JournalLessonRepository;
use phpDocumentor\Reflection\Types\Callable_;

class CourseStatus
{
    public const NEW = "new";
    public const IN_PROGRESS = "in_progress";
    public const DONE = "done";
}

class LessonStatus
{
    public const PENDING = "pending";
    public const DONE = "done";
    public const FAIL = "fail";
    public const BLOCKED = "blocked";
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

    public static function getLessonsStatuses(): array|null
    {
        $user_id = auth()->user()->id;
        $rep = new JournalLessonRepository();
        $rec = $rep->query(fn ($model) => ($model->where([
            'user_id' => $user_id
        ])))->map(function ($item) { return ['id' => $item->lesson_id, 'status' => $item-> status]; })->all();
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
        ];

        $rep = new JournalLessonRepository();
        if (!$rec)
            $rec = $rep->create($data);
        else
            $rep->update($data, $rec->id);
    }

    public static function getCourseStatus(int $id): string
    {
        return CourseStatus::DONE;
    }

    public static function setCourseStatus(int $id, string $status)
    {
        return LessonStatus::DONE;
    }

    public static function getLessonStatus(int $lid): string|null
    {
        $rec = self::getLesson($lid);
        return $rec?->status;
    }

    public static function setLessonStatus(int $lid, string $status): void
    {
        $rec = self::getLesson($lid);
        $user_id = auth()->user()->id;
        $data = [
            'user_id' => $user_id,
            'lesson_id' => $lid,
            'status' => $status
        ];

        $rep = new JournalLessonRepository();
        if (!$rec)
            $rec = $rep->create($data);
        else {
            if ($rec->status !== $status)
                $rec = $rep->update($data, $rec->id);
        }
    }

}

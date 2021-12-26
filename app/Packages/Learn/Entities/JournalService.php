<?php

namespace App\Packages\Learn\Entities;

class CourseStatus {
    public const NEW = "new";
    public const IN_PROGRESS = "in_progress";
    public const DONE = "done";
}

class LessonStatus {
    public const NEW   = "new";
    public const IN_PROGRESS   = "in_progress";
    public const PENDING = "pending";
    public const DONE = "done";
    public const FAIL = "fail";
}

class QuestionStatus {
    public const NEW   = "new";
    public const PENDING = "pending";
    public const BLOCKED = "blocked";
    public const DONE = "done";
    public const FAIL = "fail";
}


class JournalService
{
    public function getCourseStatus(int $id): string {
        return CourseStatus::DONE;
    }

    public function getLessonStatus(int $id): string {
        return LessonStatus::DONE;
    }

    public function getQuestionStatus(int $id): string {
        return QuestionStatus::DONE;
    }
}

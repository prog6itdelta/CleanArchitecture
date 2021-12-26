<?php

namespace App\Packages\Learn\UseCases;

use App\Packages\Common\Application\Services\IAuthorisationService;
use App\Packages\Learn\Infrastructure\Repositories\CourseGroupRepository;
use App\Packages\Learn\Infrastructure\Repositories\CourseRepository;
use App\Packages\Learn\Infrastructure\Repositories\CurriculumRepository;
use App\Packages\Learn\Infrastructure\Repositories\LessonRepository;

class LearnService implements LearnServiceInterface
{
    protected $authService;

    protected static $instance = null;

    public function __construct()
    {
        $this->authService = app()->make(IAuthorisationService::class);
        LearnService::$instance = $this;
    }

    public static function instance() {
        if (is_null(LearnService::$instance)) {
            LearnService::$instance = new LearnService();
        }
        return LearnService::$instance;
    }

    public static function getCourses(): array
    {
        $rep = new CourseRepository();
        $list = $rep->all()->toArray();

        $self = LearnService::instance();
        $res = array_filter($list, fn ($item) => ($self->authService::authorized("LC{$item->id}", 'read')));

        return $res;
    }

    /**
     * @param int $id
     * @return array
     */
    public static function getCourse(int $id): array
    {
        $self = LearnService::instance();
        $rep = new CourseRepository();
        $course = $rep->find($id);
        if (!$self->authService::authorized("LC{$course->id}", 'read')) {
            throw new \Error('No access');
        }
        $lessons = $course->lessons();

        $lessons = array_filter($lessons, fn ($item) => ($self->authService::authorized("LL{$item->id}", 'read')));

        return compact('course', 'lessons');
    }

    /**
     * @return array
     */
    public static function getCourseGroups(): array
    {
        $rep = new CourseGroupRepository();
        $list = $rep->all()->toArray();

        return $list;
    }

    public static function getCurriculumsFullList(): array
    {
        $rep = new CurriculumRepository();
        $list = $rep->all()->toArray();
        foreach ($list as $item) {
            $item->fetchCourses();
        }

        $self = LearnService::instance();
        $list = array_filter($list, fn ($item) => ($self->authService::authorized("LCU{$item->id}", 'read')));

        return $list;
    }

    public static function runLesson(int $id) {
        $rep = new LessonRepository();
        $lesson = $rep->find($id);

        $self = LearnService::instance();
        if (!$self->authService::authorized("LL{$lesson->id}", 'read')) {
            throw new \Error('No access');
        }

        $lesson->fetchQuestions();
        foreach ($lesson->questions as $value) {
            $value->fetchAnswers();
            // delete right answer from the frontend side
            foreach ($value->answers as $value) {
                unset($value->correct);
            }
        }
        return $lesson;
    }

}

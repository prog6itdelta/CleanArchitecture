<?php

namespace App\Packages\Learn\UseCases;

use App\Packages\Common\Application\Services\IAuthorisationService;
use App\Packages\Learn\Entities\Course;
use App\Packages\Learn\Entities\Lesson;
use App\Packages\Learn\UseCases\JournalService;
use App\Packages\Learn\Infrastructure\Repositories\CourseGroupRepository;
use App\Packages\Learn\Infrastructure\Repositories\CourseRepository;
use App\Packages\Learn\Infrastructure\Repositories\CurriculumRepository;

class LearnService implements LearnServiceInterface
{
    protected static $instance = null;
    protected $authService;

    private function __construct()
    {
        $this->authService = app()->make(IAuthorisationService::class);
    }

    public static function getCourses(): array
    {
        $rep = new CourseRepository();
        $list = $rep->all()->toArray();

        $self = LearnService::getInstance();
        $res = array_filter($list, fn($item) => ($self->authService::authorized("LC{$item->id}", 'read')));

        return $res;
    }

    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
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

        $self = LearnService::getInstance();
        $list = array_filter($list, fn($item) => ($self->authService::authorized("LCU{$item->id}", 'read')));

        return $list;
    }

    public static function runLesson(int $id)
    {
        $lesson = Lesson::getById($id);

        $self = LearnService::getInstance();
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

    /**
     * Check the answers of the question and
     * @param int $id
     * @param $data
     * @return bool|void
     */
    public static function checkLesson(int $id, $data)
    {
        $lesson = Lesson::getById($id);

        $self = LearnService::getInstance();
        if (!$self->authService::authorized("LL{$lesson->id}", 'read')) {
            throw new \Error('No access');
        }

        $result = 'done';
        $pending = false; // there is a text question, need human check
        $lesson->fetchQuestions();
        // check all questions
        foreach ($lesson->questions as $question) {
            $question->fetchAnswers();
            switch ($question->type) {
                case 'radio':
                    // only one answer
                    $answer = $data["q$question->id"] ?? false;
                    $rightAnswer = array_filter($question->answers, fn($item) => ($item->correct));
                    $rightAnswer = $rightAnswer[0] ?? false;
                    assert($rightAnswer);
                    // check one correct answer
                    if ($rightAnswer->id != $answer) $result = 'fail';
                    break;
                case 'checkbox':
                    // array of answers or []
                    $answer = $data["q$question->id"] ?? [];
                    $rightAnswer = array_filter($question->answers, fn($item) => ($item->correct));
//                    if (is_array($answer)) {
                        // check all correct answers
                        foreach ($rightAnswer as $value) {
                            if (!in_array($value->id, $answer)) $result = 'fail';
                        }
//                    } else $result = false;
                    break;
                case 'text':
                    // needed to check by instructor
                    $pending = true;
                    break;
                default:
                    assert('Unknown question type.');
            }
        }

        if ($result == 'done' && $pending) $result = 'pending';
        JournalService::storeAnswers($id, $data);
        JournalService::setLessonStatus($id, $result);

        return ($result == 'done') || ($result == 'pending');
    }

    public static function nextLesson(int $cid, int $id): Lesson|bool
    {
        //todo: move to entity
        $course = self::getCourse($cid);
        $rep = new CourseRepository();
        $lessons = $course->lessons;
        $lessons_ids = array_map(fn($e) => ($e->id), $lessons);
        $pos = array_search($id, $lessons_ids);
        if (!$pos) throw new \Exception('Error while next lesson finding...');

        if ($pos == count($lessons_ids)) return false;
        return $lessons[$pos + 1];
    }

    /**
     * @param int $id
     * @return array
     */
    public static function getCourse(int $id): Course
    {
        $course = Course::getById($id);

        $self = LearnService::getInstance();
        if (!$self->authService::authorized("LC{$course->id}", 'read')) {
            throw new \Error('No access');
        }
        $course->fetchLessons();

        $course->lessons = array_filter($course->lessons, fn($item) => ($self->authService::authorized("LL{$item->id}", 'read')));

        return $course;
    }

}

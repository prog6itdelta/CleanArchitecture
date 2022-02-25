<?php

namespace App\Http\Controllers;

use App\Packages\Department\UseCases\DepartmentService;
use App\Packages\Learn\UseCases\LearnService;
use App\Packages\Learn\UseCases\JournalService;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;
use Enforcer;

//use Illuminate\Support\Facades\Auth;
//use App\Models\User;

// TODO refactor and optimize models usage
class AdminController extends BaseController
{
    /**
     * Select portal.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function courses(Request $request)
    {
        // TODO return only courses accessible for editing by current user
        // NOTE probably I have to do this by using LearnService
        $orderBy = $request->orderby;
        $sort = $request->sort;
        $perPage = $request->perpage;
        if ($request->has('page')) { // response for pagination
            return Course::orderBy($orderBy ?? 'id', $sort ?? 'asc')->paginate($perPage ?? 10);
        }

        return Inertia::render('Admin/Courses', [
            'paginatedCourses' => fn() => Course::orderBy($orderBy ?? 'id', $sort ?? 'asc')->paginate($perPage ?? 10)
        ]);
    }

    public function editCourse(Request $request, $id = null)
    {
        $course = [];
        if ($id !== null) {
            $course = LearnService::getCourse($id);
        }
        return Inertia::render('Admin/EditCourse', compact('course'));
    }

    public function saveEditedCourse(Request $request, $id)
    {
        $path = 'empty';
        $changedFields = [];
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $imagePath = '/' . $request->image->store('images/' . explode('.', $_SERVER['HTTP_HOST'])[0] . '/course_images');
            $changedFields['image'] = $imagePath;
        }

        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && strpos($key, 'image') === false && $item !== null) {
                $changedFields[$key] = $item;
            }
        }
        Course::updateOrCreate(
            ['id' => $id],
            $changedFields
        );
        return redirect()->route('admin.courses')->with([
            'position' => 'bottom',
            'type' => 'success',
            'header' => 'Success!',
            'message' => 'Course updated successfully!',
        ]);
    }

    public function deleteCourse(Request $request, $id)
    {
        Course::find($id)->delete();
        return redirect()->route('admin.courses');
    }

    public function createCourse(Request $request)
    {
        $course = new Course;
        $path = 'empty';
        $changedFields = [];
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $imagePath = '/' . $request->image->store('images/' . explode('.', $_SERVER['HTTP_HOST'])[0] . '/course_images');
            $course->image = $imagePath;
        }

        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && strpos($key, 'image') === false && $item !== null) {
                $course->$key = $item;
            }
        }

        $course->save();
        // TODO create standalone access rights element instead of adding rules directly
        Enforcer::addPolicy('AU', "LC{$course->id}", 'read');
        return redirect()->route('admin.courses')->with([
            'position' => 'bottom',
            'type' => 'success',
            'header' => 'Success!',
            'message' => 'Course created successfully!',
        ]);
    }

    public function lessons(Request $request, $cid)
    {
        $course = LearnService::getCourse($cid);
        $lessons = array_values($course->lessons);
        return Inertia::render('Admin/Lessons', compact('lessons'));
    }

    public function editLesson(Request $request, $cid, $lid = null)
    {
        $lesson = [];
        if ($lid !== null) {
            $course = LearnService::getCourse($cid);
//            dd($course->lessons);
            $lesson = array_values(array_filter( $course->lessons, function ($item) use ($lid) {
                return $item->id === (int) $lid;
            }))[0];
//            dd($lesson);
        }
        return Inertia::render('Admin/EditLesson', compact('lesson'));
    }

    public function saveEditedLesson(Request $request, $cid, $lid)
    {
        $changedFields = [];
        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && $item !== null) {
                $changedFields[$key] = $item;
            }
        }
        Lesson::updateOrCreate(
            ['id' => $lid],
            $changedFields
        );
        return redirect()->route('admin.lessons', [$cid]);
    }

    public function deleteLesson(Request $request, $cid, $lid)
    {
        Lesson::find($lid)->delete();
        return redirect()->route('admin.lessons', [$cid]);
    }

    public function createLesson(Request $request, $cid)
    {
        $course = Course::find($cid);
        $lesson = new Lesson;

        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && $item !== null) {
                $lesson->$key = $item;
            }
        }

        $course->lessons()->save($lesson);
        // TODO create standalone access rights element instead of adding rules directly
        Enforcer::addPolicy('AU', "LL{$lesson->id}", 'read');
        return redirect()->route('admin.lessons', [$cid]);
    }

    public function questions(Request $request, $cid, $lid)
    {
        $questions = Question::where('lesson_id', $lid)->get();
        return Inertia::render('Admin/Questions', compact('questions'));
    }

    public function editQuestion(Request $request, $cid, $lid, $qid = null)
    {
        $question = [];
        if ($qid !== null) {
            $questions = Question::where('lesson_id', $lid)->get()->all();
            $question = array_values(array_filter( $questions, function ($item) use ($qid) {
                return $item->id === (int) $qid;
            }))[0];
        }
        return Inertia::render('Admin/EditQuestion', compact('question'));
    }

    public function saveEditedQuestion(Request $request, $cid, $lid, $qid)
    {
        $changedFields = [];
        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && $item !== null) {
                $changedFields[$key] = $item;
            }
        }
        Question::updateOrCreate(
            ['id' => $qid],
            $changedFields
        );
        return redirect()->route('admin.questions', [$cid, $lid]);
    }

    public function deleteQuestion(Request $request, $cid, $lid, $qid)
    {
        Question::find($qid)->delete();
        return redirect()->route('admin.questions', [$cid, $lid]);
    }

    public function createQuestion(Request $request, $cid, $lid)
    {
        $lesson = Lesson::find($lid);
        $question = new Question;

        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && $item !== null) {
                $question->$key = $item;
            }
        }

        $lesson->questions()->save($question);
        return redirect()->route('admin.questions', [$cid, $lid]);
    }

    public function answers(Request $request, $cid, $lid, $qid)
    {
        $answers = Answer::where('question_id', $qid)->get();
        return Inertia::render('Admin/Answers', compact('answers'));
    }

    public function editAnswer(Request $request, $cid, $lid, $qid, $aid = null)
    {
        $answer = [];
        if ($aid !== null) {
            $answers = Answer::where('question_id', $qid)->get()->all();
            $answer = array_values(array_filter( $answers, function ($item) use ($aid) {
                return $item->id === (int) $aid;
            }))[0];
        }
        return Inertia::render('Admin/EditAnswer', compact('answer'));
    }

    public function saveEditedAnswer(Request $request, $cid, $lid, $qid, $aid)
    {
        $changedFields = [];
        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && $item !== null) {
                $changedFields[$key] = $item;
            }
        }
        Answer::updateOrCreate(
            ['id' => $aid],
            $changedFields
        );
        return redirect()->route('admin.answers', [$cid, $lid, $qid]);
    }

    public function deleteAnswer(Request $request, $cid, $lid, $qid, $aid)
    {
        Answer::find($aid)->delete();
        return redirect()->route('admin.answers', [$cid, $lid, $qid]);
    }

    public function createAnswer(Request $request, $cid, $lid, $qid)
    {
        $question = Question::find($qid);
        $answer = new Answer;

        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && $item !== null) {
                $answer->$key = $item;
            }
        }

        $question->answers()->save($answer);
//        // TODO create standalone access rights element instead of adding rules directly
//        Enforcer::addPolicy('AU', "LL{$lesson->id}", 'read');
        return redirect()->route('admin.answers', [$cid, $lid, $qid]);
    }

    /**
     * Get departments.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function departments()
    {
        $departments = DepartmentService::getDepartments();

        return Inertia::render('Admin/Department', $departments);
    }
}

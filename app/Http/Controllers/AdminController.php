<?php

namespace App\Http\Controllers;

use App\Packages\Department\UseCases\DepartmentService;
use App\Packages\Learn\UseCases\LearnService;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;
use App\Models\Department;
use App\Models\Corriculum;
use Enforcer;
use Illuminate\Http\Request;

class AdminController extends BaseController
{
    /**
     * Get departments.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function departments()
    {
        $departments = DepartmentService::getDepartments();

        return Inertia::render('Admin/Department', compact('departments'));
    }

    public function editDepartment($id = null)
    {
        $department = [];
        if ($id !== null) {
            $department = DepartmentService::getDepartment($id)['department'];
        }
        return Inertia::render('Admin/EditDepartment', compact('department'));
    }
    
    public function saveEditedDepartment(Request $request, $id)
    {
        $changedFields = [];

        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && strpos($key, 'image') === false && $item !== null) {
                $changedFields[$key] = $item;
            }
        }

        Department::updateOrCreate(
            ['id' => $id],
            $changedFields
        );
        return redirect()->route('admin.department')->with([
            'position' => 'bottom',
            'type' => 'success',
            'header' => 'Success!',
            'message' => 'department updated successfully!',
        ]);
    }
    
    public function deleteDepartment(Request $request, $id)
    {
        Department::find($id)->delete();
        return redirect()->route('admin.departments');
    }

    public function createDepartment(Request $request)
    {
        $department = new Department;
        $changedFields = [];

        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && strpos($key, 'image') === false && $item !== null) {
                $department->$key = $item;
            }
        }

        $department->save();
        return redirect()->route('admin.departments')->with([
            'position' => 'bottom',
            'type' => 'success',
            'header' => 'Success!',
            'message' => 'Course created successfully!',
        ]);
    }

    // todo: refactor
    public function curriculums()
    {
        $curriculums = LearnService::getCurriculumsFullList();;

        return Inertia::render('Admin/Curriculums', compact('curriculums'));
    }

    public function editCurriculum($id = null)
    {
        $curriculum = [];
        if ($id !== null ) {
            // $corriculum = 
            @dd('test');
        }
        @dd($id);
    }

    public function deleteCurriculum(Request $request, $id)
    {
        @dd($id);
        // Department::find($id)->delete();
        // return redirect()->route('admin.departments');
    }

}

// public function editDepartment($id = null)
// {
//     $department = [];
//     if ($id !== null) {
//         $department = DepartmentService::getDepartment($id)['department'];
//     }
//     return Inertia::render('Admin/EditDepartment', compact('department'));
// }
<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;
use App\Models\Department;
use App\Models\User;
use App\Packages\Common\Application\Services\DepartmentService;
use Enforcer;
use Illuminate\Pagination\Paginator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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

        return Inertia::render('Admin/Departments', compact('departments'));
    }

    public function editDepartment($id = null)
    {
        $allDepartaments = DepartmentService::getDepartments()->toArray();
        $allDepartaments = array_map(fn($item) => ["value" => $item->id, "label" => $item->name], $allDepartaments['data']);
        $allUsers = User::all()->toArray();
        $allUsers = array_map(fn($item) => ["value" => $item['id'], "label" => $item['name']], $allUsers);
        $department = [];
        if ($id !== null) {
            $department = DepartmentService::getDepartment($id)['department'];
        }
        return Inertia::render('Admin/EditDepartment', compact('department', 'allDepartaments', 'allUsers'));
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
        return redirect()->route('admin.departments')->with([
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
            if ($key !== 'id' && $item !== null) {
                $department->$key = $item;
            }
        }

        $department->save();
        return redirect()->route('admin.departments')->with([
            'position' => 'bottom',
            'type' => 'success',
            'header' => 'Success!',
            'message' => 'Departament created successfully!',
        ]);
    }

    public function users()
    {

        $users = User::all();
        $users = new Paginator($users, 50);
        return Inertia::render('Admin/Users', compact('users'));
    
    }

    public function createUser(Request $request)
    {
        $changedFields = [];

        
        $path = 'empty';
        if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
            $avatarPath = '/' . $request->avatar->store('images/'. explode('.', $_SERVER['HTTP_HOST'])[0].'/avatars');
            $changedFields['avatar'] = $avatarPath;
        }
        
        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && strpos($key, 'avatar') === false && $item !== null) {
                if ($key === 'password') {
                    $changedFields[$key] = Hash::make($item, ['rounds' => 12]);
                } else {
                    $changedFields[$key] = $item;
                }
            }
        }
        $user = User::create($changedFields);
        $user->save();

        return redirect()->route('admin.users')->with([
            'position' => 'bottom',
            'type' => 'success',
            'header' => 'Success!',
            'message' => 'User created successfully!',
        ]);
    }

    public function editUser($id = null)
    {

        $user = [];
        if ($id !== null) {
            $user = User::find($id);
        }
        return Inertia::render('Admin/EditUser', compact('user'));
    }

    public function saveEditedUser(Request $request, $id)
    {
        $path = 'empty';
        $changedFields = [];
        if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
            $avatarPath = '/' . $request->avatar->store('images/'. explode('.', $_SERVER['HTTP_HOST'])[0].'/avatars');
            $changedFields['avatar'] = $avatarPath;
        }
        $input = $request->collect();
        
        foreach ($input as $key => $item) {
            if ($key !== 'id' && strpos($key, 'avatar') === false && $item !== null) {
                if ($key === 'password') {
                    $changedFields[$key] = Hash::make($item, ['rounds' => 12]);
                } else {
                    $changedFields[$key] = $item;
                }
            }
        }

        User::updateOrCreate(
            ['id' => $id],
            $changedFields
        );

        return redirect()->route('admin.users')->with([
            'position' => 'bottom',
            'type' => 'success',
            'header' => 'Success!',
            'message' => 'User updated successfully!',
        ]);
    }

    public function deleteUser(Request $request, $id)
    {
        User::find($id)->delete();
        return redirect()->route('admin.users');
    }



}

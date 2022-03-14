<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;
use App\Models\User;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;
use Enforcer;

class AccessController extends BaseController
{
    /**
     * Get departments.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Admin/Access');
    }

    public function users(Request $request)
    {
        if ($request->has('search')) {
            $search = '%' . $request->search . '%';
            $users = User::where('name', 'like', $search)->get();
        } else {
            $users = User::all()->take(10);
        }

        return json_encode($users);
    }

    public function departments(Request $request)
    {
        if ($request->has('search')) {
            $search = '%' . $request->search . '%';
            $departments = Department::where('name', 'like', $search)->get();
        } else {
            $departments = Department::all();
        }

        return json_encode($departments);
    }
}

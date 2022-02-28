<?php

namespace App\Http\Controllers;

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

    public function users()
    {
        $users = User::all();
        return json_encode($users);
    }

    public function departments()
    {
        $departments = Department::all();
        return json_encode($departments);
    }
}

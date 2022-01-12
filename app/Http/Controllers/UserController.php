<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
//use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;

use Illuminate\Support\Facades\Hash;


class UserController extends BaseController
{
    /**
     * User profile.
     *
     * @return \Inertia\Response
     */
    public function profile()
    {
        //        dd(Auth::user());
        return Inertia::render('Pages/Profile', [
            'user' => Auth::user()
        ]);
    }
    public function edit(Request $request)
    {
        $path = 'empty';
        if ($request->hasFile('new_avatar') && $request->file('new_avatar')->isValid()) {
            $avatarPath = '/' . $request->new_avatar->store('images/'. explode('.', $_SERVER['HTTP_HOST'])[0].'/avatars');
            User::updateOrCreate(
                ['id' => $request->id],
                ['avatar' => $avatarPath]
            );
        }
        $input = $request->collect();
        foreach ($input as $key => $item) {
            if ($key !== 'id' && strpos($key, 'avatar') === false && $item !== null) {
                if ($key === 'password') {
                    User::updateOrCreate(
                        ['id' => $request->id],
                        [$key => Hash::make($item, ['rounds' => 12])]
                    );
                } else {
                    User::updateOrCreate(
                        ['id' => $request->id],
                        [$key => $item]
                    );
                }
            }
        }
    }
}

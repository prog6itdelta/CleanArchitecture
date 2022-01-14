<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;

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
        if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
            $avatarPath = '/' . $request->avatar->store('images/'. explode('.', $_SERVER['HTTP_HOST'])[0].'/avatars');
            User::updateOrCreate(
                ['id' => Auth::user()->id],
                ['avatar' => $avatarPath]
            );
        }
        $input = $request->collect();
        foreach ($input as $key => $item) {
            if ($key !== 'id' && strpos($key, 'avatar') === false && $item !== null) {
                if ($key === 'password') {
                    User::updateOrCreate(
                        ['id' => Auth::user()->id],
                        [$key => Hash::make($item, ['rounds' => 12])]
                    );
                } else {
                    User::updateOrCreate(
                        ['id' => Auth::user()->id],
                        [$key => $item]
                    );
                }
            }
        }
        return redirect('profile');
        return $request;
    }
}

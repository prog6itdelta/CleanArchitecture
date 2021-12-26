<?php

namespace App\Http\Controllers;

use App\Packages\Common\Application\Services\PortalService;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

//use Illuminate\Support\Facades\Auth;
//use App\Models\User;


class PortalController extends BaseController
{
    /**
     * Select portal.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function index()
    {
//        $portals = PortalService::getUserPortals();
//        $currentPortal = PortalService::getDefaultPortal();
//        return Inertia::render('Pages/Index', [
//            'portals' => $portals,
//            'currentPortal' => $currentPortal
//        ]);
        return Redirect::route('home');
    }

    public function setPortal($id) {
//        PortalService::setDefaultPortal($id);
        return Redirect::route('home');
    }
}

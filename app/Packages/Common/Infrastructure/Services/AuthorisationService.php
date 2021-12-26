<?php

namespace App\Packages\Common\Infrastructure\Services;

use App\Packages\Common\Application\Services\IAuthorisationService;
use Enforcer;

class AuthorisationService implements IAuthorisationService
{

    public static function authorized(string $obj, string $act): bool
    {
        $user_id = UserService::currentUser()->id;
        $sub = "U$user_id";
        return AuthorisationService::checkPermission($sub, $obj, $act);
    }


    public static function checkPermission(string $sub, string $obj, string $act): bool
    {
        return Enforcer::enforce($sub, $obj, $act);
    }
}

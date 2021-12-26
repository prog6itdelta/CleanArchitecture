<?php

namespace App\Packages\Common\Application\Services;

interface IAuthorisationService
{
    /**
     * @param string $sub
     * @param string $obj
     * @param string $act
     * @return bool
     */
    public static function checkPermission(string $sub, string $obj, string $act): bool;

    /**
     * @param string $obj
     * @param string $act
     * @return bool
     */
    public static function authorized(string $obj, string $act): bool;
}

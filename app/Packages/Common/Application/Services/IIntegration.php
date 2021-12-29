<?php

namespace App\Packages\Common\Application\Services;

interface IIntegration
{
    public function getUsers(): array;

    public function getDepartments(): array;
}

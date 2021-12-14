<?php

namespace App\Packages\UseCases;

use App\Packages\Infrastructure\DTO\PortalDTO;

interface LearnServiceInterface
{
    /**
     * list of courses
     *
     * @return array
     */
    public static function getCourses(): array;

    /**
     * Course details
     *
     * @param int $id
     */
    public static function getCourse(int $id): array;

}

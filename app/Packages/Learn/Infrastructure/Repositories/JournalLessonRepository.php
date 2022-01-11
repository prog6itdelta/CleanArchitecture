<?php

namespace App\Packages\Learn\Infrastructure\Repositories;

use App\Packages\Learn\Entities\JournalLesson;
use App\Packages\Common\Infrastructure\Repositories\AbstractRepository;

class JournalLessonRepository extends AbstractRepository
{

    /**
     * @inheritDoc
     */
    function model()
    {
        return 'App\Models\JournalLesson';
    }

    /**
     * @inheritDoc
     */
    function mapProps($model)
    {
        return new JournalLesson($model->toArray());
    }
}

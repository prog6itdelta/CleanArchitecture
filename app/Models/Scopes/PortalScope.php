<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use App\Packages\Utils\ConfigStorage;
use App\Packages\UseCases\PortalService;

class PortalScope implements Scope
{
    /**
     * Применить диапазон к переданному построителю запросов.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {
        $portal_id = PortalService::getDefaultPortal()->id;
        if (!$portal_id) throw new \Exception('Portal has not been selected.');
        $builder->where('portal_id', '=', $portal_id);
    }
}

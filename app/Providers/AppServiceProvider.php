<?php

namespace App\Providers;

use App\Packages\Common\Application\Services\IAuthorisationService;
use App\Packages\Common\Infrastructure\Services\AuthorisationService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(IAuthorisationService::class, AuthorisationService::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}

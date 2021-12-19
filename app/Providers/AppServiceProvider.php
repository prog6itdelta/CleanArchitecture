<?php

namespace App\Providers;

use App\Packages\Learn\Infrastructure\Repositories\LessonRepository;
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
//        $this->app->bind(LessonRepository::class, function ($app) {
//            return new LessonRepository();
//        });
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

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
//         \App\Models\User::factory(10)->create();
        $this->call([
            UserSeeder::class,
            PortalSeeder::class,
//            CommentSeeder::class,
        ]);

        DB::table('departments')->insert([
            'portal_id' => 1,
            'name' => 'Dep 1',
        ]);

        /*
         * Наполненеие модуля Учебный центр
         */
        DB::table('learn_course_group')->insert([
            'portal_id' => 1,
            'name' => 'Группа курсов 1',
            'description' => "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        ]);
        DB::table('learn_course_group')->insert([
            'portal_id' => 1,
            'name' => 'Группа курсов 2',
            'description' => "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        ]);

        DB::table('learn_courses')->insert([
            'portal_id' => 1,
            'name' => 'Курс 1',
            'description' => "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            'group_id' => 1
        ]);
        DB::table('learn_courses')->insert([
            'portal_id' => 1,
            'name' => 'Курс 2',
            'description' => "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            'group_id' => 1
        ]);
        DB::table('learn_courses')->insert([
            'portal_id' => 1,
            'name' => 'Курс 3',
            'description' => "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        ]);

        DB::table('learn_lessons')->insert([
            'portal_id' => 1,
            'name' => 'Урок 1',
            'description' => "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            'detail_text' => "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        ]);
        DB::table('learn_lessons')->insert([
            'portal_id' => 1,
            'name' => 'Урок 2',
            'description' => "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            'detail_text' => "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        ]);

        DB::table('learn_course_lesson')->insert([
            'course_id' => 1,
            'lesson_id' => 1,
        ]);
        DB::table('learn_course_lesson')->insert([
            'course_id' => 1,
            'lesson_id' => 2,
        ]);



    }
}

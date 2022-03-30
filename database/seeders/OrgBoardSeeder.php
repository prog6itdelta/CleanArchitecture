<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class OrgBoardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('orgboard_posts')->insert([
            'name' => 'Post1',
            'description' => 'Post1 description',
            'active' => true,
            'department_id' => 1,
        ]);
        DB::table('orgboard_posts')->insert([
            'name' => 'Post2',
            'description' => 'Post2 description',
            'active' => true,
            'department_id' => 1,
            'user_id' => 1,
        ]);
    }
}

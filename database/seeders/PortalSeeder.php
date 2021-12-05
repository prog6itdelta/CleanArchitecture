<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PortalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('portals')->insert([
            'name' => 'Portal 1',
        ]);
        DB::table('portals')->insert([
            'name' => 'Portal 2',
        ]);
        DB::table('portals')->insert([
            'name' => 'Portal 3',
        ]);

        DB::table('portal_user')->insert([
            'user_id' => 1,
            'portal_id' => 1
        ]);
        DB::table('portal_user')->insert([
            'user_id' => 1,
            'portal_id' => 2
        ]);

    }
}

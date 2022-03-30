<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOrderToLearnCourseCurriculumTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('learn_course_curriculum', function (Blueprint $table) {
            $table->unsignedInteger('order')->default(1)->after('curriculum_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('learn_course_curriculum', function (Blueprint $table) {
            $table->dropColumn('order');
        });
    }
}

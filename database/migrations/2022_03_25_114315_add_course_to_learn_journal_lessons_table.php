<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCourseToLearnJournalLessonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::table('learn_journal_lessons', function (Blueprint $table) {
        //     $table->unsignedBigInteger('course_id')->after('user_id');
        //     $table->foreign('course_id')->references('id')->on('learn_courses')->onDelete('cascade')->onUpdate('cascade');
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Schema::table('learn_journal_lessons', function (Blueprint $table) {
        //     $table->dropColumn('course_id');
        // });
    }
}

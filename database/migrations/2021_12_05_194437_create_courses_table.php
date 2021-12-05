<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('learn_course_group', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('portal_id');
            $table->string('name');
            $table->unsignedInteger('sort')->default(100);
            $table->text('description')->nullable();;
            $table->string('image', 500)->nullable();;
            $table->timestamps();

            $table->foreign('portal_id')->references('id')->on('portals')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('learn_courses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('portal_id');
            $table->string('name');
            $table->boolean('active')->default(true);
            $table->unsignedInteger('sort')->default(100);
            $table->text('description')->nullable();
            $table->string('image', 500)->nullable();
            $table->unsignedBigInteger('group_id')->nullable();
            $table->timestamps();

            $table->foreign('portal_id')->references('id')->on('portals')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('group_id')->references('id')->on('learn_course_group')->onDelete('cascade')->onUpdate('cascade');
        });


        Schema::create('learn_lessons', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('portal_id');
            $table->string('name');
            $table->boolean('active')->default(true);
            $table->unsignedInteger('sort')->default(100);
            $table->text('description')->nullable();
            $table->text('detail_text')->nullable();
            $table->string('image', 500)->nullable();
            $table->timestamps();

            $table->foreign('portal_id')->references('id')->on('portals')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('learn_course_lesson', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('course_id');
            $table->unsignedBigInteger('lesson_id');
            $table->timestamps();

            $table->foreign('course_id')->references('id')->on('learn_courses')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('lesson_id')->references('id')->on('learn_lessons')->onDelete('cascade')->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('learn_course_group');
        Schema::dropIfExists('learn_courses');
    }
}

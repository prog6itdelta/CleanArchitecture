import React from 'react';
import List from '../Components/List.jsx';
import {InertiaLink} from "@inertiajs/inertia-react";

export default function Course({ course }) {
  let lessons = course.lessons;
  lessons = Object.values(lessons);
  return (
    <div className="bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative lg:row-start-1 lg:col-start-2">
            <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
              <figure>
                <div className="aspect-w-12 aspect-h-7 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    className="rounded-lg shadow-lg object-cover object-center"
                    src={course.image}
                    alt={course.name}
                  />
                </div>
              </figure>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="text-base max-w-prose mx-auto lg:max-w-none">
              <header>
                <h1 className="text-3xl font-bold leading-tight text-gray-900">{course.name}</h1>
              </header>
              <main>
                <p className="text-lg text-gray-500">
                  {course.description}
                </p>
                <List listItems={lessons} type="lessons" />
              </main>
              {lessons.length > 0 &&
                <InertiaLink href={route('lesson', [course.id, lessons[0].id])}>
                RUN !!!
                </InertiaLink>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

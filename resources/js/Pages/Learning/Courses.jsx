import React from 'react';
// import Layout from './Layout'
import { InertiaLink } from '@inertiajs/inertia-react';

export default function Courses({ courses }) {
  return (
    <div className="bg-white">
      <div className="mx-auto px-4 max-w-7xl sm:px-6 lg:px-8">
        <div className="space-y-12">
          <header className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Учебный центр</h2>
          </header>
          <ul
            role="list"
            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
          >
            {courses.map((course) => (
              <li key={course.id}>
                <div className="space-y-4">
                  <div className="aspect-w-3 aspect-h-2">
                    <img className="object-cover shadow-lg rounded-lg" src={
                      course.image
                        ? course.image
                        : '/img/noimage.jpg'
                    } alt={course.name} />
                  </div>

                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3 className="hover:text-gray-500">
                        <InertiaLink href={route('course', course.id)}>
                          {course.id} - {course.name}
                        </InertiaLink></h3>
                      <p className="text-indigo-600">{course.description}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

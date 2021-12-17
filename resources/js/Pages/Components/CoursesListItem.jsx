import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function CoursesListItem({ course }) {
  return (
    <li>
      <div className="space-y-4">
        <div className="aspect-w-3 aspect-h-2">
          <img className="object-cover shadow-lg rounded-lg"
            src={
              course.image
                ? course.image
                : '/img/noimage.jpg'
            }
            alt={course.name}
          />
        </div>

        <div className="space-y-2">
          <div className="text-lg leading-6 font-medium space-y-1">
            <h3 className="hover:text-gray-500">
              <InertiaLink href={route('course', course.id)}>
                {course.id} - {course.name}
              </InertiaLink></h3>
            <p className="text-indigo-600">
              {`${course.description.substr(0, 100)}...`}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

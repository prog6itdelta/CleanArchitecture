import React from 'react';
import CoursesListItem from './CoursesListItem.jsx';

export default function CoursesList({ courses }) {
  return (
    <ul
      role="list"
      className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
    >
      {courses.map((course) => (
        <CoursesListItem course={course} key={course.id} />
      ))}
    </ul>
  );
}

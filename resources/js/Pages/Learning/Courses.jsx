import React, { useState } from 'react';
// import Layout from './Layout'
import { InertiaLink } from '@inertiajs/inertia-react';
import { SearchIcon } from '@heroicons/react/solid';

export default function Courses({ courses }) {
  const [searchString, setSearchString] = useState('');

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    if (searchString !== val) {
      setSearchString(val);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto px-4 max-w-7xl sm:px-6 lg:px-8">
        <div className="space-y-12">
          <header className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Учебный центр</h2>
          </header>
          <div className="flex-1 flex items-center justify-center px-2 lg:justify-end">
            <div className="container">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Поиск по курсам"
                  type="search"
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          <ul
            role="list"
            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
          >
            {courses
              .filter((course) => course.name.toLowerCase().includes(searchString))
              .map((course) => (
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
                        <p className="text-indigo-600">{`${course.description.substr(0, 100)}...`}</p>
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

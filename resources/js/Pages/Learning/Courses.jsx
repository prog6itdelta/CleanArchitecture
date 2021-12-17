import React, { useState } from 'react';
// import Layout from './Layout'
import { InertiaLink } from '@inertiajs/inertia-react';
import SearchPanel from '../Components/SearchPanel.jsx';
import CoursesList from '../Components/CoursesList.jsx';
import SectionTabs from '../Components/SectionTabs.jsx';

export default function Courses({ courses }) {
  const [state, setState] = useState({
    searchString: '',
    searchPlaceholder: 'Поиск по курсам'
  });

  const handleSearch = (value) => setState({ searchString: value });
  const filteredCourses = courses.filter((course) => course.name.toLowerCase().includes(state.searchString));

  return (
    <div className="bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="space-y-5">
          <header className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Учебный центр</h2>
          </header>
          <div className="px-2 pb-5 sm:pb-0 border-b border-gray-200 flex-1 flex flex-wrap sm:flex-nowrap items-center justify-around sm:justify-between">
            <SectionTabs />
            <SearchPanel
              onChange={handleSearch}
              placeholder={state.searchPlaceholder}
            />
          </div>
          <CoursesList courses={filteredCourses} />
        </div>
      </div>
    </div >
  );
}

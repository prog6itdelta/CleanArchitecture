import React, { useState, useEffect } from 'react';
import SectionTabs from '../Components/SectionTabs.jsx';
import SearchPanel from '../Components/SearchPanel.jsx';
import List from '../Components/List.jsx';

export default function Courses({ courses }) {
  const [searchString, setSearchString] = useState('');
  const [tabs, setTabs] = useState([
    {
      name: 'Курсы',
      href: route('courses'),
      current: true,
      searchPlaceholder: 'Поиск по курсам'
    },
    {
      name: 'Программы обучения',
      href: route('programs'),
      current: false,
      searchPlaceholder: 'Поиск по программам'
    }
  ]);
  const [programs, setPrograms] = useState([
    { id: 1, name: 'Программа 1', courses: [1, 2] },
    { id: 2, name: 'Программа 2', courses: [3] }
  ]);

  const handleSearch = (value) => setSearchString(value);
  useEffect(() => {
    const newTabs = tabs.map((tab) => {
      tab.href.includes(route().current())
        ? tab.current = true
        : tab.current = false;
      return tab;
    });
    setTabs(newTabs);
  }, []);
  // const handleTabChange = (name) => {
  //   const newTabs = tabs.map((tab) => {
  //     tab.name === name
  //       ? tab.current = true
  //       : tab.current = false;
  //     return tab;
  //   });
  //   setTabs(newTabs);
  // };

  // console.log(route('learning'));
  // console.log(route().current());
  // console.log(tabs);

  return (

    <div className="bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="space-y-5">
          <header className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Учебный центр</h2>
          </header>
          <div className="px-2 pb-5 sm:pb-0 border-b border-gray-200 flex-1 flex flex-wrap sm:flex-nowrap items-center justify-around sm:justify-between">
            <SectionTabs tabs={tabs} />
            <SearchPanel
              onChange={handleSearch}
              placeholder={tabs.find((tab) => tab.current).searchPlaceholder}
            />
          </div>
          {(() => {
            switch (tabs.find((tab) => tab.current).name) {
              case 'Курсы':
                return <List
                  listItems={courses.filter((course) => course.name.toLowerCase().includes(searchString))}
                  type="courses"
                />;
              case 'Программы обучения':
                return <List
                  listItems={programs.filter((program) => program.name.toLowerCase().includes(searchString))}
                  type="programs"
                  courses={courses}
                />;
              default:
                return <List listItems={courses} type="courses" />;
            }
          })()}
        </div>
      </div>
    </div >
  );
}

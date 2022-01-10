import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

export default function List({ listItems, type, ...props }) {

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const disclousureListClasses = 'mx-auto space-y-3';
  const disclosureClasses = 'overflow-hidden bg-indigo-100 rounded-lg';
  // const disclosureButtonClasses = 'text-left w-full flex justify-between items-start text-gray-400';
  const disclosureButtonClasses = 'flex justify-between items-center w-full p-4 font-medium text-left text-white bg-indigo-500 rounded-lg hover:bg-indigo-300 hover:text-gray-900  focus:outline-none focus-visible:ring focus-visible:ring-indigo';
  const disclosurePanelClasses = 'mt-5 px-5';

  const Courses = () => {
    return (
      <ul
        role="list"
        className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
      >
        {listItems.map((listItem) => (
          <li key={listItem.id} >
            <div className="space-y-4">
              <InertiaLink href={route('course', listItem.id)}>
                <div className="aspect-w-3 aspect-h-2">
                  <img className="object-cover shadow-lg rounded-lg"
                    src={
                      listItem.image
                        ? listItem.image
                        : '/img/noimage.jpg'
                    }
                    alt={listItem.name}
                  />
                </div>

                <div className="text-lg leading-6 font-medium py-3">
                  <h3 className="hover:text-gray-500">
                    {listItem.id} - {listItem.name}
                  </h3>
                  <p className="text-indigo-600">
                    {`${listItem.description.substr(0, 100)}...`}
                  </p>
                </div>
              </InertiaLink>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const Curriculums = () => {
    return (
      <ul className={disclousureListClasses}>
        {listItems.map((listItem) => (
          <Disclosure as="li" key={listItem.id} className={disclosureClasses}>
            {({ open }) => (
              <>
                <div className="text-lg">
                  <Disclosure.Button className={disclosureButtonClasses}>
                    <span>{listItem.name}</span>
                    <span className="ml-6 h-7 flex items-center">
                      <ChevronDownIcon
                        className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                        aria-hidden="true"
                      />
                    </span>
                  </Disclosure.Button>
                </div>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel as="div" className={disclosurePanelClasses}>
                    <List
                      listItems={listItem.courses}
                      type="courses"
                    />
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const CourseGroups = () => {
    return (
      <ul className={disclousureListClasses}>
        {listItems.map((listItem) => {
          if (props.courses.find((course) => course.course_group_id === listItem.id) === undefined) {
            return false;
          }
          return (
            <Disclosure as="li" key={listItem.id} className={disclosureClasses} defaultOpen={true} >
              {({ open }) => (
                <>
                  <div className="text-lg">
                    <Disclosure.Button className={disclosureButtonClasses}>
                      <span>{listItem.name}</span>
                      <span className="ml-6 h-7 flex items-center">
                        <ChevronUpIcon
                          className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                          aria-hidden="true"
                        />
                      </span>
                    </Disclosure.Button>
                  </div>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel as="div" className={disclosurePanelClasses}>
                      <List
                        listItems={
                          props.courses
                            .filter((course) => course.course_group_id === listItem.id)
                        }
                        type="courses"
                      />
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          );
        })}
        {
          props.courses.find((course) => course.course_group_id === null) !== undefined
          && <Disclosure as="li" key="ungroupped" className={disclosureClasses} defaultOpen={true} >
            {({ open }) => (
              <>
                <div className="text-lg">
                    <Disclosure.Button className={disclosureButtonClasses}>
                    <span>Курсы без группы</span>
                    <span className="ml-6 h-7 flex items-center">
                      <ChevronUpIcon
                        className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                        aria-hidden="true"
                      />
                    </span>
                  </Disclosure.Button>
                </div>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                    <Disclosure.Panel className={disclosurePanelClasses}>
                    <List
                      listItems={
                        props.courses
                          .filter((course) => course.course_group_id === null)
                      }
                      type="courses"
                    />
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        }
      </ul>
    );
  };

  const Lessons = () => {
    return (
      <div className="mt-5 bg-gray-50">
        <div className="mx-auto">
          <div className="mx-auto divide-y-2 divide-gray-200">
            <ul className="space-y-3 divide-y divide-gray-200">
              {listItems.map((listItem) => (
                <Disclosure as="li" key={listItem.id} className="pt-2 px-2">
                  {({ open }) => (
                    <>
                      <div className="text-lg">
                        <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                          <span className="font-medium text-gray-900">{listItem.name}</span>
                          <span className="ml-6 h-7 flex items-center">
                            <ChevronDownIcon
                              className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </div>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel as="p" className="mt-2 pr-12">
                          {listItem.description}
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {(() => {
        switch (type) {
          case 'courses':
            return <Courses />;
          case 'curriculums':
            return <Curriculums />;
          case 'courseGroups':
            return <CourseGroups />;
          case 'lessons':
            return <Lessons />;
          default:
            return <Courses />;
        }
      })()}
    </>
  );
}

import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

export default function List({ listItems, type, ...props }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const Courses = () => {
    return (
      <ul
        role="list"
        className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
      >
        {listItems.map((listItem) => (
          <li key={listItem.id} >
            <div className="space-y-4">
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

              <div className="space-y-2">
                <div className="text-lg leading-6 font-medium space-y-1">
                  <h3 className="hover:text-gray-500">
                    <InertiaLink href={route('course', listItem.id)}>
                      {listItem.id} - {listItem.name}
                    </InertiaLink></h3>
                  <p className="text-indigo-600">
                    {`${listItem.description.substr(0, 100)}...`}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const Programs = () => {
    return (
      <div className="bg-gray-50">
      <div className="mx-auto py-2 sm:py-2">
        <div className="mx-auto divide-y-2 divide-gray-200">
          <ul className="space-y-6 divide-y divide-gray-200">
            {listItems.map((listItem) => (
              <Disclosure as="li" key={listItem.id} className="pt-2">
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
                    <Disclosure.Panel as="ul" className="mt-2 pr-12">
                      <List
                        listItems={props.courses.filter((course) => listItem.courses.includes(course.id))}
                        type="courses"
                      />
                    </Disclosure.Panel>
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
          case 'programs':
            return <Programs />;
          default:
            return (
              <ul>{listItems.map((listItem) => (
                <ListItem listItem={listItem} type="list-item" key={listItem.id} />
              ))}</ul>
            );
        }
      })()}
    </>
  );
}

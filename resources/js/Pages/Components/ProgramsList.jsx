import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import CoursesList from './CoursesList.jsx';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProgramsList({ programs, courses }) {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto py-2 sm:py-2">
        <div className="mx-auto divide-y-2 divide-gray-200">
          <dl className="space-y-6 divide-y divide-gray-200">
            {programs.map((program) => (
              <Disclosure as="div" key={program.id} className="pt-2">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                        <span className="font-medium text-gray-900">{program.name}</span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <CoursesList
                        courses={courses.filter((course) => program.courses.includes(course.id))}
                      />
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

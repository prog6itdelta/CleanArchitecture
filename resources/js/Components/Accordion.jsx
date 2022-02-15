import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { useState } from 'react';

export default function Accordion({ title, children }) {
  return (
    <Disclosure as="div" className="inline-block w-full drop-shadow-lg" defaultOpen={true}>
      {({ open }) => (
        <>
          <Disclosure.Button className="inline-flex justify-center items-center w-full py-2 px-2
        bg-indigo-600 text-base font-medium text-indigo-100 transition duration-300 hover:bg-indigo-500
        rounded
        ">
            {title}
            {open ? (
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5 "
                aria-hidden="true"
              />
            ) : (
              <ChevronUpIcon className="-mr-1 ml-2 h-5 w-5 "/>
            )}
          </Disclosure.Button>

          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >

            <Disclosure.Panel className="origin-top-right w-full bg-indigo-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
              <div className="py-1 pl-2">
                <p>{children}</p>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function SectionTabs({ tabs, onChange }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  // FIXME Возможно, костыль. Нужно ревью!
  const handleClick = (e) => {
    Inertia.get(e.target.dataset.href);
  };

  return (
    <div className="mb-2 sm:mb-0 sm:mt-4 min-w-full sm:min-w-min">
      <div className="sm:hidden">
        <label htmlFor="current-tab" className="sr-only">
          Select a tab
        </label>
        <select
          id="current-tab"
          name="current-tab"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name} name={tab.name} data-href={tab.href} onClick={handleClick}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <InertiaLink
              key={tab.name}
              name={tab.name}
              href={tab.href}
              className={classNames(
                tab.current
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              {tab.name}
            </InertiaLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

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
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name} name={tab.name} data-href={tab.href} onClick={handleClick}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4">
          {tabs.map((tab) => (
            <InertiaLink
              key={tab.name}
              name={tab.name}
              href={tab.href}
              className={classNames(
                tab.current ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                'px-3 py-2 font-medium text-sm rounded-md'
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

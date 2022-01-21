import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ColumnFilter({ column }) {
  const { filterValue, setFilter } = column;
  return (
    <span className="mt-1 relative flex items-center">
      <input
        type="text"
        value={filterValue || ''}
        placeholder='Поиск'
        onChange={(e) => setFilter(e.target.value)}
        className="
        shadow-sm block w-full border-gray-300 rounded-md text-center
        focus:ring-indigo-500 focus:border-indigo-500
        sm:text-sm"
      />
    </span>
  );
}

export function SelectColumnFilter({
  column: {
    filterValue, setFilter, preFilteredRows, id
  },
}) {
  const [selected, setSelected] = useState();
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  const onSelectChange = (e) => {
    setFilter(e || undefined);
    setSelected(e);
  };

  // Render a multi-select box
  return (
    <Listbox value={filterValue} onChange={onSelectChange}>
      {({ open }) => (
        <>
          <div className="mt-1 relative flex items-center w-full">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
              <span className="block truncate">
                {selected !== undefined
                  ? selected
                  : 'Выберите значение'
                }
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm top-8">
                <Listbox.Option
                  key={'reset'}
                  className={({ active }) => classNames(
                    active ? 'bg-gray-200' : 'text-gray-900',
                    'cursor-default select-none relative py-2 pl-8 pr-4'
                  )
                  }
                  value={undefined}
                >
                  {() => (
                    <>
                      <span className={
                        classNames(
                          selected === undefined
                            ? 'font-semibold'
                            : 'font-normal',
                          'block truncate text-xs'
                        )}
                      >
                        По умолчанию
                      </span>

                      {selected === undefined ? (
                        <span
                          className={classNames(
                            selected === undefined ? 'text-gray-600' : 'text-indigo-600',
                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) => classNames(
                      active ? 'bg-gray-200' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-8 pr-4'
                    )
                    }
                    value={option}
                  >
                    {() => (
                      <>
                        <span className={
                          classNames(
                            selected === option
                              ? 'font-semibold'
                              : 'font-normal',
                            'block truncate text-xs'
                          )}
                        >
                          {option}
                        </span>

                        {selected === option ? (
                          <span
                            className={classNames(
                              selected === option ? 'text-gray-600' : 'text-indigo-600',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

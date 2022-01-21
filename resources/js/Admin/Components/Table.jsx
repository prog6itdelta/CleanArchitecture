import React, { Fragment, useState } from 'react';
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
  useRowSelect,
  useResizeColumns,
  useFlexLayout,
} from 'react-table';
import {
  SortAscendingIcon,
  SortDescendingIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SelectorIcon,
  CheckIcon
} from '@heroicons/react/outline';
import { Listbox, Transition } from '@headlessui/react';
import ColumnFilter from './ColumnFilter.jsx';
import GlobalFilter from './GlobalFilter.jsx';

export default function Table({ dataValue, columnsValue }) {
  const data = React.useMemo(() => dataValue, []);
  const columns = React.useMemo(() => columnsValue, []);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 50,
      width: 60,
      maxWidth: 400,
      // DefaultFilter
      Filter: ColumnFilter,
    }),
    []
  );

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    useFlexLayout,
    useResizeColumns,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />

          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          ),
          disableFilters: true
        },
        ...columns,
      ]);
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    pageCount,
    gotoPage,
    previousPage,
    nextPage,
    allColumns,
    getToggleHideAllColumnsProps,
    setPageSize,
    state,
    state: { pageIndex, pageSize },
    selectedFlatRows,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;
  // Update the state when input changes

  const SortingIndicator = ({ column, className }) => {
    if (column.isSorted) {
      if (column.isSortedDesc) { return <SortAscendingIcon className={className} />; }
      return <SortDescendingIcon className={className} />;
    }

    if (column.disableFilters !== true) { return <SelectorIcon className={`${className} text-gray-300`} />; }
    return null;
  };
  const NumberOfElementsSelector = () => {
    const pSizes = [10, 20, 30, 40, 50, 60];
    return (
      <Listbox value={pageSize} onChange={(e) => { setPageSize(Number(e)); }}>
        {({ open }) => (
          <>
            <div className="relative flex items-center">
              <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                <span className="block truncate">
                  {`Показать ${pageSize} элементов`}
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
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm bottom-8">
                  {pSizes.map((pSize) => (
                    <Listbox.Option
                      key={`pSize${pSize}`}
                      className={({ active }) => `
                      ${active
                          ? 'bg-gray-200'
                          : 'text-gray-900'
                        } cursor-default select-none relative py-2 pl-8 pr-4`
                      }
                      value={pSize}
                    >
                      {() => (
                        <>
                          <span className={
                            `${pageSize === pSize
                              ? 'font-semibold'
                              : 'font-normal'
                            } block truncate text-xs'`
                          }
                          >
                            {`Показать ${pSize} элементов`}
                          </span>

                          {pageSize === pSize ? (
                            <span
                              className={
                                `${pageSize === pSize
                                  ? 'text-gray-600'
                                  : 'text-indigo-600'
                                } absolute inset-y-0 left-0 flex items-center pl-1.5`
                              }
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
  };

  const Pagination = () => {
    return (
      <div className="px-2 py-3 flex items-center justify-between w-full">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={previousPage}
            key='buttonPrev'
          >
            Previous
          </button>
          <button
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={nextPage}
            key='buttonNext'
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <NumberOfElementsSelector />
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={previousPage}
                key='prev'
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
              {pageOptions.map((item) => {
                if (item === 0 || item === pageCount - 1 || item === pageIndex - 1 || item === pageIndex || item === pageIndex + 1) {
                  return (
                    <button
                      className={
                        `${item === pageIndex
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'border-gray-300 text-gray-500 hover:bg-gray-50'}
                            relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-white`
                      }
                      key={`paginationItem${item}`}
                      onClick={() => gotoPage(item)}
                    >
                      {item + 1}
                    </button>
                  );
                }
                if (item === pageIndex - 2 || item === pageIndex + 2) {
                  return (
                    <button
                      className="border-gray-300 text-gray-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-white"
                      key={`dots${item}`}
                    >
                      ...
                    </button>
                  );
                }
                return null;
              })}
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={nextPage}
                key='next'
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  const VisibleColumnsSelector = () => {
    return (
      // TODO disable visibility change on option click
      <Listbox>
        {({ open }) => (
          <>
            <div className="relative flex items-center">
              <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                <span className="block truncate">Выбрать столбцы для показа</span>
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
                <Listbox.Options as="div" className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm bottom-8">
                  {allColumns.map((column) => (
                    <Listbox.Option
                      as="label"
                      key={`${column.id}Selector`}
                      className={({ active }) => `
                        ${active
                          ? 'bg-gray-200'
                          : 'text-gray-900'
                        } cursor-pointer relative px-4 py-2 min-w-full block`
                      }
                      value={column.id}
                    >
                      {() => (
                        <>
                          <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" {...column.getToggleHiddenProps()} />
                          <span className={
                            `${column.isVisible
                              ? 'font-semibold'
                              : 'font-normal'
                            } ml-2 truncate text-xs'`
                          }
                          >
                            {column.id}
                          </span>
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
  };

  const PageSelector = () => {
    return (
      <div className="bottom-2 ">
        <span>
          Перейти на страницу:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>
      </div>
    );
  };

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <div className="flex flex-col">
        <div className="max-w-full w-full">
          <div className="align-middle inline-block max-w-full w-full border-b border-gray-100 bg-gray-100 sm:rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table
                className="min-w-full divide-y divide-gray-400 border-collapse"
                {...getTableProps()}
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          scope="col"
                          className="px-3 py-3 text-center border-r border-gray-300 text-xs font-medium text-gray-500 uppercase tracking-wider flex flex-wrap items-center justify-center"
                          {...column.getHeaderProps()}
                        >
                          <div className="flex w-full items-center justify-center" {...column.getSortByToggleProps()}>
                            <span className="relative">
                              {column.render('Header')}
                              <SortingIndicator
                                column={column}
                                className="absolute top-0 -right-4 w-4 h-4"
                              />
                            </span>
                          </div>

                          {column.canFilter ? column.render('Filter') : null}

                          <div
                            className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                            {...column.getResizerProps()}
                          ></div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                {/* Apply the table body props */}
                <tbody
                  {...getTableBodyProps()}
                >
                  {
                    // Loop over the table rows
                    page.map((row, i) => {
                      // Prepare the row for display
                      prepareRow(row);
                      return (
                        // Apply the row props
                        <tr
                          className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-300`}
                          {...row.getRowProps()}
                        >
                          {
                            // Loop over the rows cells
                            row.cells.map((cell) => {
                              // Apply the cell props
                              return (
                                <td
                                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center border-r border-gray-300 flex flex-wrap items-center justify-center"
                                  {...cell.getCellProps()}
                                >
                                  {
                                    // Render the cell contents
                                    cell.render('Cell')
                                  }
                                </td>
                              );
                            })
                          }
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>

            <VisibleColumnsSelector />
            {/* <PageSelector /> */}

            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
}

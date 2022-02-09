import React, {Fragment, useState, useEffect, useRef} from 'react';
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
  CheckIcon,
  PencilIcon,
  ClipboardCheckIcon
} from '@heroicons/react/outline';
import {Listbox, Transition} from '@headlessui/react';
import ColumnFilter from './ColumnFilter.jsx';
import GlobalFilter from './GlobalFilter.jsx';
import EditableCell from './EditableCell.jsx';

// TODO add manual pagination
export default function TableWithManualPagination({dataValue, columnsValue, updateData, skipPageReset, ...props}) {
  const {
    options: {
      showGlobalFilter = true,
      showColumnSelection = true,
      showElementsPerPage = true,
      showGoToPage = true,
      showPagination = true,
    } = {
      showGlobalFilter,
      showColumnSelection,
      showElementsPerPage,
      showGoToPage,
      showPagination,
    }
  } = props;

  const data = React.useMemo(() => dataValue, []);
  const columns = React.useMemo(() => columnsValue, []);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 50,
      width: 60,
      maxWidth: 400,
      // DefaultFilter
      Filter: ColumnFilter,
      // Cell: EditableCell
    }),
    []
  );

  const IndeterminateCheckbox = React.forwardRef(
    ({indeterminate, ...rest}, ref) => {
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    previousPage,
    nextPage,
    allColumns,
    getToggleHideAllColumnsProps,
    setPageSize,
    state,
    state: {pageIndex, pageSize},
    selectedFlatRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {pageIndex: 0},
      autoResetPage: !skipPageReset,
      updateData,
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
          Header: ({getToggleAllRowsSelectedProps}) => (
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />

          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({row}) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          ),
          disableFilters: true
        },
        ...columns,
      ]);
    }
  );

  const {globalFilter} = state;
  // Update the state when input changes

  const [openColumnSelector, setOpenColumnSelector] = useState(false);
  const onVisibilityChange = () => { setOpenColumnSelector(!openColumnSelector); };

  const SortingIndicator = ({column, className}) => {
    if (column.isSorted) {
      if (column.isSortedDesc) { return <SortAscendingIcon className={className}/>; }
      return <SortDescendingIcon className={className}/>;
    }

    if (column.disableFilters !== true) { return <SelectorIcon className={`${className} text-gray-300`}/>; }
    return null;
  };

  const VisibleColumnsSelector = () => {
    return (
      <Listbox onChange={() => null}>
        {({open}) => (
          <>
            <div className="relative flex items-center" style={{width: '220px'}}>
              <Listbox.Button
                className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <span className="block truncate -ml-3 -mr-10 -my-2 pl-3 pr-10 py-2" onClick={onVisibilityChange}>Выбрать столбцы</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon className="h-5 w-5 text-gray-600" aria-hidden="true"/>
                </span>
              </Listbox.Button>

              <Transition
                show={openColumnSelector}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options as="div"
                                 className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm bottom-9">
                  {allColumns.map((column) => (
                    <Listbox.Option
                      as="label"
                      key={`${column.id}Selector`}
                      className={({active}) => `
                              ${active
                        ? 'bg-gray-200'
                        : 'text-gray-900'
                      } cursor-pointer relative px-4 py-2 min-w-full block`
                      }
                      value={column.id}
                    >
                      {() => (
                        <>
                          <input type="checkbox"
                                 className="form-checkbox h-5 w-5 text-gray-600" {...column.getToggleHiddenProps()} />
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

  const NumberOfElementsSelector = () => {
    const pSizes = [10, 20, 50, 100, data.length];
    return (
      <Listbox value={pageSize} onChange={(e) => { setPageSize(Number(e)); }}>
        {({open}) => (
          <>
            <div className="relative flex items-center" style={{width: '220px'}}>
              <Listbox.Button
                className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                <span className="block truncate">
                  {`Показать ${pageSize === data.length ? `все элементы` : `${pageSize} элементов`}`}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon className="h-5 w-5 text-gray-600" aria-hidden="true"/>
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm bottom-8">
                  {pSizes.map((pSize) => (
                    <Listbox.Option
                      key={`pSize${pSize === data.length ? `All` : pSize}`}
                      className={({active}) => `
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
                            {`Показать ${pSize === data.length ? `все элементы` : `${pSize} элементов`}`}
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
                              <CheckIcon className="h-5 w-5" aria-hidden="true"/>
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

  const PageSelector = () => {
    const [pageToGo, setPageToGo] = useState(pageIndex + 1);
    return (
      <div>
        <label htmlFor="goToPage" className="block text-sm font-medium text-gray-700 max-w-fit">
          Перейти на страницу
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <div className="relative flex items-stretch flex-grow focus-within:z-10">
            <input
              type="number"
              name="goToPage"
              value={pageToGo}
              min={1}
              max={pageCount}
              id="goToPage"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
              placeholder="John Doe"
              onChange={(e) => setPageToGo(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            onClick={() => gotoPage(pageToGo - 1)}
          >
            <span>Перейти</span>
          </button>
        </div>
      </div>
    );
  };

  const Pagination = () => {
    return (
      <div className="flex items-center justify-between min-w-full">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={previousPage}
            disabled={!canPreviousPage}
            key="buttonPrev"
          >
            Previous
          </button>
          <button
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={nextPage}
            disabled={!canNextPage}
            key="buttonNext"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
          {/* <NumberOfElementsSelector /> */}
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={previousPage}
                disabled={!canPreviousPage}
                key="prev"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
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
                disabled={!canNextPage}
                key="next"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="max-w-full w-full">
          <div
            className="align-middle inline-block max-w-full w-full border-b border-gray-100 bg-gray-100 sm:rounded-lg shadow overflow-hidden">
            {showGlobalFilter && <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>}
            <div className="overflow-x-auto">
              <table
                className="min-w-full divide-y divide-gray-400 border-collapse"
                {...getTableProps()}
              >
                <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => {
                      const getSortByToggleProps = {...column.getSortByToggleProps()};
                      return (
                        <th
                          scope="col"
                          className="px-3 py-3 text-center border-r border-gray-300 text-xs font-medium text-gray-500 tracking-wider flex flex-wrap items-center justify-center"
                          {...column.getHeaderProps()}
                        >
                          <div
                            className="flex w-full items-center justify-center" {...column.disableFilters ? null : getSortByToggleProps}>
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
                      );
                    })}
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
                                className={`p-2 whitespace-nowrap text-sm text-gray-500 justify-center border-r border-gray-300 flex flex-wrap items-center overflow-hidden`}
                                {...cell.getCellProps()}
                              >
                                {cell.render('Cell')}
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

            <div
              className="px-2 pt-3 flex flex-wrap items-center justify-center sm:justify-between w-full space-y-2 sm:space-y-0">
              {showColumnSelection && <VisibleColumnsSelector/>}
              {showElementsPerPage && <NumberOfElementsSelector/>}
            </div>
            <div className="px-2 py-3 flex flex-wrap items-center justify-center w-full space-y-2">
              {showGoToPage && <PageSelector/>}
              {showPagination && <Pagination/>}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

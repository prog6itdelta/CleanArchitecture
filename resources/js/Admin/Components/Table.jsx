import React, { useState } from "react";
import ColumnFilter from "./ColumnFilter";
import GlobalFilter from "./GlobalFilter";
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
  useRowSelect,
  useResizeColumns,
  useBlockLayout,
} from "react-table";
import {
  SortAscendingIcon,
  SortDescendingIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
export default function Table({ dataValue, columnsValue }) {
  const data = React.useMemo(() => dataValue, []);
  const columns = React.useMemo(() => columnsValue, []);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 50,
      width: 20,
      maxWidth: 400,
      //DefaultFilter
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
      columns: columns,
      data: data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    useBlockLayout,
    useResizeColumns,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
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
    allColumns,
    getToggleHideAllColumnsProps,
    setPageSize,
    state,
    state: { pageIndex, pageSize},
    selectedFlatRows,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;
  // Update the state when input changes

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <div className="py-4">
        <select
          className="bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 text-left cursor-default"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Показать {pageSize} элементов
            </option>
          ))}
        </select>
      </div>
      <table
        {...getTableProps()}
        className="divide-gray-200 border-b border-gray-200 sm:rounded-lg divide-y divide-gray-200 "
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="text-center text-sm font-medium text-gray-500 uppercase bg-white tracking-wide pt-3"
                >
                  {column.render("Header")}
                  <span className="absolute">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <SortAscendingIcon className="w-5 h-5" />
                      ) : (
                        <SortDescendingIcon className="w-5 h-5" />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                  <div
                    {...column.getResizerProps()}
                    className={`resizer ${
                      column.isResizing ? "isResizing" : ""
                    }`}
                  ></div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {
            // Loop over the table rows
            page.map((row, i) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()} className="">
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="text-center text-sm font-medium text-gray-900"
                        >
                          {
                            // Render the cell contents
                            cell.render("Cell")
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

      <div className="flex">
        <label className="mr-4 ">
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
          Показать всё
        </label>
        {allColumns.map((column) => (
          <label key={column.id} className="mr-4">
            <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
            {column.id}
          </label>
        ))}
      </div>

      <p>Выбранные ID: {selectedFlatRows.map((d) => d.original.id + ", ")}</p>
      <div className="absolute bottom-2 ">
      <span>
          Перейти на страницу:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <a
            href="#"
            onClick={() => gotoPage(0)}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="w-5 h-5"></ChevronLeftIcon>
          </a>
          
          {pageOptions.map((item) => (
            <a
              href="#"
              aria-current="page"
              key={item}
              className={item === pageIndex
                         ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                         : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'}
              onClick={() => gotoPage((item -= 1))}
            >
              {(item += 1)}
            </a>
          ))}
          <a
            href="#"
            onClick={() => gotoPage(pageCount - 1)}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronRightIcon className="w-5 h-5"></ChevronRightIcon>
          </a>
        </nav>
      </div>
    </>
  );
}

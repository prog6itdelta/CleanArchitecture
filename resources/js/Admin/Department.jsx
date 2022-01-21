import React, { useMemo } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useTable } from 'react-table';

export default function Departments(props) {
  const localeRu = {
    toolbarColumns: 'Столбцы',
    columnsPanelTextFieldLabel: 'Найти...',
    columnsPanelTextFieldPlaceholder: 'Название столбца',
    columnsPanelShowAllButton: 'Показать все',
    columnsPanelHideAllButton: 'Скрыть все',
    toolbarFilters: 'Фильтры',
    filterPanelAddFilter: 'Добавить фильтр',
    filterPanelDeleteIconLabel: 'Удалить',
    filterPanelOperators: 'Операторы',
    filterPanelOperatorAnd: 'И',
    filterPanelOperatorOr: 'ИЛИ',
    filterPanelColumns: 'Столбцы',
    filterPanelInputLabel: 'Значение',
    columnMenuLabel: 'Меню',
    columnMenuShowColumns: 'Показать столбцы',
    columnMenuFilter: 'Фильтр',
    columnMenuHideColumn: 'Скрыть',
    columnMenuUnsort: 'Отмена',
    columnMenuSortAsc: 'Сортировать по возрастанию',
    columnMenuSortDesc: 'Сортировать по убыванию',
    filterPanelInputPlaceholder: 'Фильтровать',
    filterOperatorContains: 'Содержит',
    filterOperatorEquals: 'Равен',
    filterOperatorStartsWith: 'Начинается с',
    filterOperatorEndsWith: 'Заканчивается',
    filterOperatorIsEmpty: 'Пусто',
    filterOperatorIsNotEmpty: 'Не пусто',
    toolbarDensity: 'Размер',
    toolbarDensityLabel: 'Размер',
    toolbarDensityCompact: 'Маленький',
    toolbarDensityStandard: 'Средний',
    toolbarDensityComfortable: 'Большой',
    toolbarExport: 'Экспорт',
    toolbarExportLabel: 'Экспорт',
    toolbarExportCSV: 'Загрузить как CSV',
    toolbarExportPrint: 'Распечатать',
  };

  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id'
    },
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Head',
      accessor: 'head'
    },
    {
      Header: 'Parent',
      accessor: 'parent'
    }
  ], []);

  const data = useMemo(() => props.data.map((department) => ({
    id: department.id,
    name: department.name,
    head: department.head,
    parent: department.parent
  })), []);

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;
  return (
    <div>

      <header>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 text-center">Департаменты</h1>
        </div>
      </header>
      <main>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
                  <thead className="bg-gray-50">
                    {// Loop over the header rows
                      headerGroups.map((headerGroup) => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {// Loop over the headers in each row
                            headerGroup.headers.map((column) => (
                              // Apply the header cell props
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                {...column.getHeaderProps()}
                              >
                                {// Render the header
                                  column.render('Header')}
                              </th>
                            ))}
                        </tr>
                      ))}
                  </thead>
                  {/* Apply the table body props */}
                  <tbody {...getTableBodyProps()}>
                    {// Loop over the table rows
                      rows.map((row, rowIdx) => {
                        // Prepare the row for display
                        prepareRow(row);
                        return (
                          // Apply the row props
                          <tr
                            className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                            {...row.getRowProps()}
                          >
                            {// Loop over the rows cells
                              row.cells.map((cell) => {
                                // Apply the cell props
                                return (
                                  <td
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    {...cell.getCellProps()}
                                  >
                                    {// Render the cell contents
                                      cell.render('Cell')}
                                  </td>
                                );
                              })}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

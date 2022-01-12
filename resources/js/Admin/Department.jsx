import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

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
    }

    const data = {
        columns: [{
            editable: false,
            field: 'id',
            headerName: 'ID'
        }, {
            editable: false,
            field: 'name',
            headerName: 'Название'
        }, {
            editable: false,
            field: 'head',
            headerName: 'HEAD'
        }, {
            editable: false,
            field: 'parent',
            headerName: 'PARENT'
        }],
        rows: props.data.map((department) =>({
            'id': department.id,
            'name': department.name,
            'head': department.head,
            'parent': department.parent
        }))
    }
    console.log(props);
    return (
        <div>

            <header>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold leading-tight text-gray-900 text-center">Департаменты</h1>
                </div>
            </header>
            <main>
            <div style={{ height: 700, width: '100%' }}>
                <DataGrid className="mt-10"
                    localeText={localeRu}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    {...data}
                    columns={data.columns.map((column) => ({
                        ...column,
                        filterable: true,
                    }))}
                />
            </div>
            </main>
        </div>
    )
}

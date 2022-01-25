import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import Table from './Components/Table.jsx';
// import { data, columns } from './TableData.jsx';
import ColumnFilter, { SelectColumnFilter } from './Components/ColumnFilter.jsx';
import EditableCell from './Components/EditableCell.jsx';
import OneLineCell from './Components/OneLineCell.jsx';

export default function Index({ courses }) {
  // console.log(courses);

  // const columns = Object.keys(courses[0]).map((key) => {
  //   const column = {
  //     Header: key.toUpperCase(),
  //     accessor: key,
  //     Filter: key === 'id' ? '' : ColumnFilter,
  //     width: key === 'id' ? 50 : 300,
  //     Cell: key === 'id' ? ({ value }) => String(value) : EditableCell,
  //   };
  //   return column;
  // });

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      Filter: '',
      width: 50,
      // Cell: EditableCell,
    },
    {
      Header: 'Name',
      accessor: 'name',
      Filter: '',
      width: 250,
      Cell: EditableCell,
    },
    {
      Header: 'description',
      accessor: 'description',
      Filter: '',
      width: 300,
      Cell: OneLineCell,
    },
    {
      Header: 'image',
      accessor: 'image',
      Filter: '',
      width: 300,
      Cell: OneLineCell,
    },
    {
      Header: 'active',
      accessor: 'active',
      Filter: '',
      width: 70,
      Cell: OneLineCell,
    },
  ];

  const tableOptions = {
    showGlobalFilter: true,
    showColumnSelection: true,
    showElementsPerPage: true,
    showGoToPage: false,
    showPagination: true,
  };

  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const updateData = (rowIndex, columnId, value) => {
    const oldValue = courses[rowIndex][columnId];
    setSkipPageReset(true);
    if (value !== oldValue) {
      const oldCourse = courses[rowIndex];
      console.log('oldCourse: ', oldCourse);
      const newCourse = {
        ...oldCourse,
        [columnId]: value
      };
      console.log('newCourse: ', newCourse);
      Inertia.post(route('admin.changeCourse', newCourse.id), newCourse);
    }
  };

  React.useEffect(() => {
    setSkipPageReset(false);
  }, [courses]);

  return (
    <>
      <header>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 text-center">Админка</h1>
        </div>
      </header>
      <main className='w-full h-fit'>
        <Table
          dataValue={courses}
          columnsValue={columns}
          skipPageReset={skipPageReset}
          updateData={updateData}
          options={tableOptions}
        />
      </main>
    </>
  );
}

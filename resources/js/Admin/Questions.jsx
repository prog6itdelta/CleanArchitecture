import React, { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Table from './Components/Table.jsx';
import EditableCell from './Components/EditableCell.jsx';
import OneLineCell from './Components/OneLineCell.jsx';

export default function Lessons({ lessons }) {
  console.log(lessons);
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
      Header: 'details',
      accessor: 'detail_text',
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
    const oldValue = lessons[rowIndex][columnId];
    setSkipPageReset(true);
    if (value !== oldValue) {
      const oldCourse = lessons[rowIndex];
      const newCourse = {
        ...oldCourse,
        [columnId]: value
      };
      // Inertia.post(route('admin.courses.edit', newCourse.id), newCourse);
    }
  };

  useEffect(() => {
    setSkipPageReset(false);
  }, [lessons]);

  return (
    <>
      <header>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 text-center">Админка</h1>
        </div>
      </header>
      <main className='w-full h-fit'>
        <Table
          dataValue={lessons}
          columnsValue={columns}
          skipPageReset={skipPageReset}
          updateData={updateData}
          options={tableOptions}
        />
      </main>
    </>
  );
}

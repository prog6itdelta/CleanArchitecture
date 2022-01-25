import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import Table from './Components/Table.jsx';
// import { data, columns } from './TableData.jsx';
import ColumnFilter, { SelectColumnFilter } from './Components/ColumnFilter.jsx';

export default function Index({ courses }) {
  // console.log(courses);

  const columns = Object.keys(courses[0]).map((key) => {
    return {
      Header: key.toUpperCase(),
      accessor: key,
      Filter: key === 'id' ? '' : ColumnFilter,
      width: 300,
    };
  });

  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const updateData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    console.log('rowIndex ', rowIndex);
    console.log('columnId ', columnId);
    console.log('value ', value);
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
        />
      </main>
    </>
  );
}

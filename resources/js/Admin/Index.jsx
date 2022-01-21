import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import Table from './Components/Table.jsx';
import { data, columns } from './TableData.jsx';

export default function Index() {
  return (
    <div /*title="Добро пожаловать"*/>

      <header>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 text-center">Админка</h1>
        </div>
      </header>
      <main className='w-full h-full'
        style={{ height: '700px' }}>
        <Table dataValue={data} columnsValue={columns} />
      </main>
    </div>
  );
}

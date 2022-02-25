import React, { useState, useEffect, useContext } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Table from '../Components/Table.jsx';
import OneLineCell from '../Components/OneLineCell.jsx';
import ActionsCell from '../Components/ActionsCell.jsx';
import { AdminContext } from './reducer.jsx';

export default function Lessons({ lessons }) {
  const { state: { navigation: nav }, dispatch } = useContext(AdminContext);

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      Filter: '',
      width: 250,
      Cell: OneLineCell,
    },
    {
      Header: 'active',
      accessor: 'active',
      Filter: '',
      width: 70,
      Cell: OneLineCell,
    },
    {
      Header: 'ACTIONS',
      accessor: 'rowActions',
      disableFilters: true,
      Filter: '',
      width: 100,
      Cell: ActionsCell,
    },
  ];
  const addActions = (items) => {
    return items.map((item, i) => {
      return {
        ...item,
        rowActions: [
          {
            name: 'edit',
            type: 'edit',
            action: () => {
              Inertia.get(route('admin.lesson.edit', [nav.currentCourse.id, item.id]));
            },
            disabled: false,
          },
          {
            name: 'delete',
            type: 'delete',
            action: () => {
              Inertia.post(route('admin.lesson.delete', [nav.currentCourse.id, item.id]), {}, {
                onSuccess: () => {
                  dispatch({
                    type: 'SHOW_NOTIFICATION',
                    payload: {
                      position: 'bottom',
                      type: 'success',
                      header: 'Success!',
                      message: 'Lesson deleted!',
                    }
                  });
                  setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), 3000);
                  Inertia.get(route('admin.lessons', nav.currentCourse.id));
                }
              });
            },
            disabled: false,
          },
        ]
      };
    });
  };

  const [data, setData] = useState(addActions(lessons));

  useEffect(() => {
    setData(addActions(lessons));
  }, [nav]);

  useEffect(() => {
    dispatch({
      type: 'CHANGE_HEADER', payload: 'Уроки'
    });
  }, []);

  return (
    <main className="w-full h-fit">
      <Table
        dataValue={data}
        columnsValue={columns}
      />
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 mt-4 text-base font-medium text-white
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm
            bg-indigo-500 hover:bg-indigo-700"
        onClick={() => {
          Inertia.get(route('admin.lesson.create', nav.currentCourse.id));
        }}
      >Add Lesson
      </button>
    </main>
  );
}

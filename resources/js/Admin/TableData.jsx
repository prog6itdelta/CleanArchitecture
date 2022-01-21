import React, { state, setState } from 'react';
import { useFilters } from 'react-table';
import { SelectColumnFilter } from './Components/ColumnFilter.jsx';

export const columns = [
  {
    Header: 'ID',
    accessor: 'id',
    Filter: '',
    maxWidth: 100

  },
  {
    Header: 'Имя',
    accessor: 'firstname',
    minWidth: 200

  },
  {
    Header: 'Фамилия',
    accessor: 'lastname',
    minWidth: 200

  },
  {
    Header: 'Email',
    accessor: 'email',
    minWidth: 300

  },
  {
    Header: 'Роль',
    accessor: 'role',
    minWidth: 200,
    Filter: SelectColumnFilter
  },

];

export const data = new Array(1000).fill(0).map((item, idx) => {
  const subData = [
    {
      id: '1',
      firstname: 'Test',
      lastname: 'tesT',
      email: 'test@mail.ru',
      role: 'admin'
    },
    {
      id: '2',
      firstname: 'Test',
      lastname: 'tesT',
      email: 'test2@mail.ru',
      role: 'user'
    },
    {
      id: '3',
      firstname: 'Test',
      lastname: 'tesT',
      email: 'test3@mail.ru',
      role: 'guest'
    },
    {
      id: '4',
      firstname: 'Test',
      lastname: 'tesT',
      email: 'test@mail.ru',
      role: 'admin'
    },
    {
      id: '5',
      firstname: 'Test',
      lastname: 'tesT',
      email: 'test2@mail.ru',
      role: 'user'
    },
    {
      id: '6',
      firstname: 'Test',
      lastname: 'tesT',
      email: 'test3@mail.ru',
      role: 'guest'
    },
    {
      id: '7',
      firstname: 'Test',
      lastname: 'tesT',
      email: 'test@mail.ru',
      role: 'admin'
    },
    {
      id: '8',
      firstname: 'Test',
      lastname: 'tesT',
      email: 'test2@mail.ru',
      role: 'user'
    },
    {
      id: '9',
      firstname: 'Test',
      lastname: 'tesT',
      email: 'test3@mail.ru',
      role: 'guest'
    },
    {
      id: '10',
      firstname: 'Test',
      lastname: 'tesT',
      email: 'test@mail.ru',
      role: 'admin'
    },
    {
      id: '11',
      firstname: 'Test',
      lastname: 'tesT',
      email: 'test2@mail.ru',
      role: 'user'
    },
    {
      id: '12',
      firstname: 'Test',
      lastname: 'tesT',
      email: 'test3@mail.ru',
      role: 'guest'
    },
    {
      id: '13',
      firstname: 'Test',
      lastname: 'tesT',
      email: 'test3@mail.ru',
      role: 'guest'
    },
    {
      id: '14',
      firstname: 'Test',
      lastname: 'tesT',
      email: 'test3@mail.ru',
      role: 'guest'
    },
  ];
  item = subData[Math.floor(Math.random() * subData.length)];
  return item;
});

import React, { useState, useEffect, useContext } from 'react';
import Table from '../Components/Table.jsx';
import { AdminContext } from './reducer.jsx';
//  TODO REFACTOR THIS shit
export default function Departments({ departments }) {
  const { state: { navigation: nav }, dispatch } = useContext(AdminContext);

  const columns =  [
    {
      Header: 'ID',
      accessor: 'id',
      Filter: '',
    },
    {
      Header: 'Name',
      accessor: 'name',
      Filter: '',
    },
    {
      Header: 'Head',
      accessor: 'head',
      Filter: '',
    },
    {
      Header: 'Parent',
      accessor: 'parent',
      Filter: '',
    }
  ];
  const addActions = (items) => {
    return  items.map((item, i) => {
      return item
    })
  };

  const [data, setData] = useState(addActions(departments.data));

  useEffect(() => {
    setData(addActions(departments.data));
  }, [nav]);

  useEffect(() => {
    dispatch({
      type: 'CHANGE_HEADER', payload: 'Департаменты'
    });
  }, []);

  return (
      <main>
        <Table
          dataValue={data}
          columnsValue={columns}
        />
      </main>
  );
}

import React, { Fragment, useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import { AdminContext } from './reducer.jsx';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import Table from '../Components/Table.jsx';
import NameCell from '../Components/NameCell';
import TwoLineCell from '../Components/TwoLineCell';
import StatusCell from '../Components/StatusCell';
import ActionsCell from '../Components/ActionsCell';
import OneLineCell from '../Components/OneLineCell';


export default function Access() {
  const userTypes = [
    {
      name: 'Users',
      id: 1,
      current: true
    },
    {
      name: 'Positions',
      id: 2,
      current: false
    },
    {
      name: 'Departments',
      id: 3,
      current: false
    },
    {
      name: 'Working Groups',
      id: 4,
      current: false
    },
    {
      name: 'Others',
      id: 5,
      current: false
    }
  ];
  const columns = [
    {
      Header: 'Имя',
      accessor: 'name',
      Filter: '',
      width: 300,
      Cell: OneLineCell,
    },
    {
      Header: 'Действия',
      accessor: 'rowActions',
      disableFilters: true,
      Filter: '',
      maxWidth: 150,
      Cell: ActionsCell,
    },
  ];
  const [selectedUserType, setSelectedUserType] = useState(userTypes[0]);
  const [data, setData] = useState([]);
  const updateItem = (item) => {
    setData((data) => {
      const updatedItemIndex = data.findIndex((oldItem) => oldItem.id === item.id);
      data[updatedItemIndex].selected = data[updatedItemIndex].rowActions[0].selected = !data[updatedItemIndex].selected;
      return [...data];
    });
  }
  const addActions = (items) => {
    return items.map((item, i) => {
      return {
        ...item,
        selected: item.selected ?? false,
        rowActions: [
          {
            name: item.selected ? 'deselect' : 'select',
            type: 'select',
            selected: item.selected ?? false,
            action: () => updateItem(item),
            disabled: false,
          },
        ]
      };
    });
  };

  useEffect(() => {
    let resource;
    switch (selectedUserType.id){
      case 1: resource = 'users'; break;
      case 2: resource = 'positions'; break;
      case 3: resource = 'departments'; break;
      case 4: resource = 'working-groups'; break;
      case 5: resource = 'others'; break;
      default: resource = 'users'; break;
    }
    axios
      .get(`/api/${resource}`)
      .then((resp) => {
        console.log(resp);
        setData(addActions(resp.data));
      })
  }, [selectedUserType]);

  useEffect(() => {
    setData((data) => data);
  }, [data]);



  const UserGroupSelector = () => {
    return (
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select User Group
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            value={userTypes.find((userType) => userType.id === selectedUserType.id).id}
            onChange={(e) => {setSelectedUserType(userTypes.find((userType) => userType.id === Number(e.target.value)));}}
          >
            {userTypes.map((userType) => (
              <option key={userType.id} value={userType.id}>{userType.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="text-center">Select User Group</div>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              {userTypes.map((userType) => (
                <div
                  key={userType.id}
                  className={
                    `${userType.id === selectedUserType.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm cursor-pointer`
                  }
                  onClick={() => setSelectedUserType(userType)}
                >
                  {userType.name}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <UserGroupSelector/>
      {data.length !== 0 &&
        <Table
          dataValue={data}
          columnsValue={columns}
        />
      }
      {data.length !== 0 && console.log(data)}
    </>
  );
}
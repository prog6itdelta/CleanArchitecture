import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

/**
 * Props selectedUsers and setSelectedUsers comes from parents useState
 * That allows Access component to be controlled by parent like controlled input
 */
export default function Access({ selectedUsers, setSelectedUsers }) {
  // shown in userTypes is used for prevent unnecessary requests to server
  const [userTypes, setUserTypes] = useState([
    {
      name: 'Users',
      id: 1,
      current: true,
      shown: false,
      search: false,
      currentPage: 1,
      isLastPage: false
    },
    {
      name: 'Positions',
      id: 2,
      current: false,
      shown: false,
      search: false,
      currentPage: 1,
      isLastPage: false
    },
    {
      name: 'Departments',
      id: 3,
      current: false,
      shown: false,
      search: false,
      currentPage: 1,
      isLastPage: false
    },
    {
      name: 'Working Groups',
      id: 4,
      current: false,
      shown: false,
      search: false,
      currentPage: 1,
      isLastPage: false
    },
    {
      name: 'Others',
      id: 5,
      current: false,
      shown: false,
      search: false,
      currentPage: 1,
      isLastPage: false
    }
  ]);
  const [searchString, setSearchString] = useState('');
  const getCurrentUserType = () => userTypes.find((type) => type.current === true);
  const setCurrentUserType = (id) => {
    setUserTypes((prev) => {
      prev.forEach((item) => {
        id === item.id
          ? item.current = true
          : item.current = false;
      });
      return [...prev];
    });
  };
  const [data, setData] = useState([]);
  const selectUser = (user) => {
    if (data.find(item => item.id === user.id && item.type === user.type) !== undefined) {
      setData((prev) => {
        const idx = prev.findIndex((item) => item.type === user.type && item.id === user.id);
        prev[idx].selected = true;
        return [...prev];
      });
      setSelectedUsers((prev) => {
        return [...prev, user];
      });
    }
  };
  const removeUser = (user) => {
    setData((prev) => {
      const idx = prev.findIndex((item) => item.type === user.type && item.id === user.id);
      idx !== -1 ? prev[idx].selected = false : null;
      return [...prev];
    });
    setSelectedUsers((prev) => {
      const idx = prev.findIndex((item) => item.type === user.type && item.id === user.id);
      prev.splice(idx, 1);
      return [...prev];
    });
  };
  const fetchUsers = (nextPage = false) => {
    const currentUserType = getCurrentUserType();
    if (
      !currentUserType.shown
      || (searchString !== '' && currentUserType.search !== searchString)
      || (searchString === '' && currentUserType.search !== false)
      || nextPage
    ) {

      let resource;
      switch (currentUserType.id) {
        case 1:
          resource = 'users';
          break;
        case 2:
          resource = 'positions';
          break;
        case 3:
          resource = 'departments';
          break;
        case 4:
          resource = 'working-groups';
          break;
        case 5:
          resource = 'others';
          break;
        default:
          resource = 'users';
          break;
      }
      axios
        .get(`/api/${resource}?page=${nextPage ? `${currentUserType.currentPage + 1}` : ''}${searchString !== '' ? `search=${searchString}` : ''}`)
        .then((resp) => {
          const {current_page: currentPage, last_page: lastPage} = resp.data;
          console.log("-> resp.data", resp.data);
          const data = resp.data.data.map((item) => {
            item.selected = !!selectedUsers.find((user) => user.type === currentUserType.id && user.id === item.id);
            item.type = currentUserType.id;
            item.searchedBy = searchString;
            return item;
          });

          setData((prev) => {
            const filteredPrev = prev.filter((item) => item.searchedBy === searchString);
            return [...filteredPrev, ...data];
          });

          setUserTypes((prev) => {
            const idx = prev.findIndex((type) => type.current === true);
            prev[idx].shown = true;
            if (searchString !== '' && searchString !== prev[idx].search) {
              prev[idx].search = searchString;
            } else if (searchString === '') {
              prev[idx].search = false;
            }
            currentPage === lastPage
              ? prev[idx].isLastPage = true
              : prev[idx].isLastPage = false;
            return [...prev];
          });

        });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userTypes, searchString]);

  const UserGroupSelector = () => {
    return (
      <div className="block">
        <div className="text-center">Select User Group</div>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {userTypes.map((userType) => (
              <div
                key={userType.id}
                className={
                  `${userType.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm cursor-pointer`
                }
                onClick={() => setCurrentUserType(userType.id)}
              >
                {userType.name}
              </div>
            ))}
          </nav>
        </div>
      </div>
    );
  };

  const DataList = () => {
    return (
      <div className="w-full flex flex-wrap">
        <div className="w-full h-60 sm:w-1/2 overflow-y-auto">
          <ul role="list" className="divide-y divide-gray-200 bg-white">
            {data.filter(item => item.type === getCurrentUserType().id).map((item) => {
              return (
                <li
                  key={item.id}
                  className={`py-2 pl-2 flex cursor-pointer ${item.selected ? 'bg-gray-50 font-extrabold' : ' hover:bg-gray-50'}`}
                  onClick={() => {
                    if (item.selected === false) {
                      selectUser({
                        type: getCurrentUserType().id,
                        id: item.id,
                        name: item.name
                      });
                    } else {
                      removeUser(item);
                    }
                  }}
                >{item.name}</li>
              );
            })}
          </ul>
          {!getCurrentUserType().isLastPage &&
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => fetchUsers(true)}
            >
              Load more...
            </button>
          }
        </div>
        <ul role="list" className="border-l p-1 bg-white w-full sm:w-1/2">
          {selectedUsers.map((item) => {
            return (
              <li
                key={`${item.type}_${item.id}`}
                className="inline-flex items-center py-0.5 pl-2 pr-0.5 m-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
              >
                {item.name}
                <button
                  type="button"
                  className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none focus:bg-gray-500 focus:text-white"
                  onClick={() => {
                    removeUser(item);
                  }}
                >
                  <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7"/>
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <>
      <UserGroupSelector/>
      <input
        type="text"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
        placeholder="Search"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <DataList/>
    </>
  );
}

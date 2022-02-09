import React, { useState, useEffect, useRef, useContext } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import { Switch } from '@headlessui/react';
import Table from './Components/Table.jsx';
import EditableCell from './Components/EditableCell.jsx';
import OneLineCell from './Components/OneLineCell.jsx';
import ActionsCell from './Components/ActionsCell.jsx';
import Modal from './Components/Modal.jsx';
import { AdminContext } from './reducer.jsx';

export default function Courses({ courses, page_count: controlledPageCount }) {
  const [showModal, setShowModal] = useState(false);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [editedCourse, setEditedCourse] = useState(null);
  const {state, dispatch} = useContext(AdminContext);
  useEffect(() => {
    setSkipPageReset(false);
  }, [courses]);

  const showCourseLessons = (course) => {
    dispatch({
      type: 'CHOSE_COURSE',
      payload: {
        id: course.id,
        name: course.name
      }
    });
    Inertia.post(route('admin.lessons', course.id));
  };

  const columns = [
    {
      Header: 'Действия',
      accessor: 'rowActions',
      disableFilters: true,
      Filter: '',
      width: 100,
      Cell: ActionsCell,
    },
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
  const tableData = courses.map((course, i) => {
    return {
      ...course,
      rowActions: [
        {
          name: 'edit',
          type: 'edit',
          action: () => {
            setEditedCourse(course);
            setShowModal(true);
          },
          disabled: false,
        },
        {
          name: 'Открыть',
          type: 'open',
          action: () => showCourseLessons(course),
        },
        {
          name: 'delete',
          type: 'delete',
          action: () => console.log('delete'),
          disabled: Boolean(i % 2),
        },
      ]
    };
  });
  const tableOptions = {
    showGlobalFilter: true,
    showColumnSelection: true,
    showElementsPerPage: true,
    showGoToPage: false,
    showPagination: true,
  };
  const updateData = (rowIndex, columnId, value) => {
    const oldValue = courses[rowIndex][columnId];
    setSkipPageReset(true);
    if (value !== oldValue) {
      const oldCourse = courses[rowIndex];
      const newCourse = {
        ...oldCourse,
        [columnId]: value
      };
      Inertia.post(route('admin.course.edit', newCourse.id), newCourse);
    }
  };

  const EditCourseForm = () => {
    const [courseImg, setCourseImg] = useState(editedCourse.image);
    const courseImgInput = useRef();
    const { data, setData, post } = useForm({
      name: editedCourse.name,
      active: editedCourse.active,
      description: editedCourse.description,
      image: editedCourse.image,
      options: editedCourse.options
    });

    const onCourseImgChange = (e) => {
      setData('image', e.target.files[0]);
      const reader = new FileReader();
      reader.onload = function (ev) {
        setCourseImg(ev.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    };

    return (
      <>
        <div className="bg-white -mx-6 -mt-5 shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Редактирование курса: {data.name}</h3>
          </div>
          <div className="border-t border-gray-200">
            <ul>
              <li className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <span className="text-sm font-medium text-gray-500">Название курса</span>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md"
                />
              </li>
              <li className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <span className="text-sm font-medium text-gray-500">Статус</span>
                <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <Switch
                    checked={Boolean(data.active)}
                    onChange={(e) => {setData('active', Number(e))}}
                    className={`
                    ${Boolean(data.active) ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    `}
                  >
                    <span className="sr-only">Course state</span>
                    <span
                      className={`
                      ${Boolean(data.active) ? 'translate-x-5' : 'translate-x-0'}
                        'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                        `}
                    >
                      <span
                        className={`
                        ${Boolean(data.active) ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'}
                        absolute inset-0 h-full w-full flex items-center justify-center transition-opacity
                        `}
                        aria-hidden="true"
                      >
                        <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                          <path
                            d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span
                        className={`${Boolean(data.active) ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                        aria-hidden="true"
                      >
                        <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                          <path
                            d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"/>
                        </svg>
                      </span>
                    </span>
                  </Switch>
                </span>
              </li>
              <li className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <span className="text-sm font-medium text-gray-500">Описание курса</span>
                <textarea
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md"
                  defaultValue={editedCourse.description}
                />
              </li>
              <li className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <span className="text-sm font-medium text-gray-500">Изображение курса</span>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="w-full mb-4 flex justify-center rounded-md overflow-hidden bg-gray-100 col-span-2">
                    <img src={courseImg} alt="course image"/>
                  </span>
                  <input
                    ref={courseImgInput}
                    type="file"
                    name="avatar"
                    id="avatar"
                    onChange={onCourseImgChange}
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 col-span-10 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </li>
              <li className="bg-gray-50 px-4 py-5 sm:px-6">
                <span className="block text-sm font-medium text-gray-500 text-center">Параметры курса</span>
              </li>
              <li className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <span className="text-sm font-medium text-gray-500">Время между попытками</span>
                <input
                  type="text"
                  value={JSON.parse(data.options) !== null ? JSON.parse(data.options).delayTime : '' }
                  onChange={(e) => {
                    let courseOptions = JSON.parse(data.options);
                    if (courseOptions !== null) { courseOptions.delayTime = e.target.value; }
                    else { courseOptions = { delayTime: e.target.value }; }
                    setData('options', JSON.stringify(courseOptions));
                  }}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md"
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
            onClick={() => {
              post(route('admin.course.edit', editedCourse.id),
                { data, onSuccess: (res) => {Inertia.get(route(route().current()));} });
              setShowModal(false);

            }}
          >
            Сохранить
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
            onClick={() => setShowModal(false)}
          >
            Отмена
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <header>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 text-center">Админка</h1>
        </div>
      </header>
      <main className="w-full h-fit">
        <Table
          dataValue={tableData}
          columnsValue={columns}
          skipPageReset={skipPageReset}
          updateData={updateData}
          options={tableOptions}
          controlledPageCount={controlledPageCount}
        />
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          <EditCourseForm/>
        </Modal>
      </main>
    </>
  );
}

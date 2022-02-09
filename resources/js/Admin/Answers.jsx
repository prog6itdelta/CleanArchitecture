import React, { useState, useEffect, useContext } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import { Switch, RadioGroup } from '@headlessui/react';
import Table from './Components/Table.jsx';
import EditableCell from './Components/EditableCell.jsx';
import OneLineCell from './Components/OneLineCell.jsx';
import ActionsCell from './Components/ActionsCell.jsx';
import Modal from './Components/Modal.jsx';
import { AdminContext } from './reducer.jsx';

export default function Answers({ answers, page_count: controlledPageCount }) {
  const [showModal, setShowModal] = useState(false);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [editedAnswer, setEditedAnswer] = useState(null);
  const {state: { navigation: nav }} = useContext(AdminContext);
  useEffect(() => {
    setSkipPageReset(false);
  }, [answers]);

  const columns = [
    {
      Header: 'ACTIONS',
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
      Header: 'Sort',
      accessor: 'sort',
      Filter: '',
      width: 300,
      Cell: OneLineCell,
    },
    {
      Header: 'Correct',
      accessor: 'correct',
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
  const tableData = answers.map((answer, i) => {
    return {
      ...answer,
      rowActions: [
        {
          name: 'edit',
          type: 'edit',
          action: () => {
            setEditedAnswer(answer);
            setShowModal(true);
          },
          disabled: false,
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
    const oldValue = answers[rowIndex][columnId];
    setSkipPageReset(true);
    if (value !== oldValue) {
      const oldAnswer = answers[rowIndex];
      const newAnswer = {
        ...oldAnswer,
        [columnId]: value
      };
      Inertia.post(route('admin.answers.edit', [nav.currentCourse.id, nav.currentLesson.id, nav.currentQuestion.id, newAnswer.id]), newAnswer);
    }
  };

  const EditAnswerForm = () => {
    const { data, setData, post } = useForm({
      name: editedAnswer.name,
      active: editedAnswer.active,
      correct: editedAnswer.correct,
      sort: editedAnswer.sort,
    });

    return (
      <>
        <div className="bg-white -mx-6 -mt-5 shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Редактирование ответа: {data.name}</h3>
          </div>
          <div className="border-t border-gray-200">
            <ul>
              <li className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <span className="text-sm font-medium text-gray-500">Ответ</span>
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
                    onChange={(e) => {
                      setData('active', Number(e));
                    }}
                    className={`
                    ${Boolean(data.active) ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    `}
                  >
                    <span className="sr-only">Answer state</span>
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
                <span className="text-sm font-medium text-gray-500">Is answer correct?</span>
                <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <Switch
                    checked={Boolean(data.correct)}
                    onChange={(e) => {
                      setData('correct', Number(e));
                    }}
                    className={`
                    ${Boolean(data.correct) ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    `}
                  >
                    <span className="sr-only">Is answer correct?</span>
                    <span
                      className={`
                      ${Boolean(data.correct) ? 'translate-x-5' : 'translate-x-0'}
                        'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                        `}
                    >
                      <span
                        className={`
                        ${Boolean(data.correct) ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'}
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
                        className={`${Boolean(data.correct) ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
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
              <li className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <span className="text-sm font-medium text-gray-500">Сортировка</span>
                <input
                  type="number"
                  value={data.sort}
                  min={0}
                  max={990}
                  step={10}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-md sm:text-sm border-gray-300"
                  onChange={(e) => setData('sort', e.target.value)}
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
              post(route('admin.answers.edit', [nav.currentCourse.id, nav.currentLesson.id, nav.currentQuestion.id, editedAnswer.id]),
                { data, onSuccess: () => {Inertia.get(route(route().current(), [nav.currentCourse.id, nav.currentLesson.id, nav.currentQuestion.id]));} });
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
          <EditAnswerForm/>
        </Modal>
      </main>
    </>
  );
}

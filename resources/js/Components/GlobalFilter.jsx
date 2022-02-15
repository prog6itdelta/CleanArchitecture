import React from 'react';

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    // <div>
    //   Найти:{' '}
    //   <input value={filter || ''} onChange={(e) => setFilter(e.target.value)} className="w-1/2 h-8 my-4 border" />
    // </div>
    <div className="border border-gray-300 rounded-md px-3 py-2 m-5 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 bg-white text-center">
      <label
        htmlFor="tableGlobalSearch"
        className="block text-xs font-medium text-gray-800 "
      >
        Поиск по таблице
      </label>
      <input
        type="text"
        name="tableGlobalSearch"
        id="tableGlobalSearch"
        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm text-center"
        placeholder="Текст для поиска"
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default GlobalFilter;

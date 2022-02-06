import React, { useState, useEffect, useRef } from 'react';
import {
  PencilIcon,
  ClipboardCheckIcon
} from '@heroicons/react/outline';

const ActionsCell = ({ value: actions, row: { index }, column: { id } }) => {

  return (
    <div
      className="flex flex-wrap space-y-2 justify-center align-center"
    >
      {actions.map((action) => (
        <button
          key={action.name}
          type="button"
          className={`
            inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm
            ${action.disabled === true
            ? 'opacity-30 cursor-not-allowed bg-gray-400'
            : action.type === 'delete'
              ? 'bg-red-500 hover:bg-red-500'
              : 'bg-indigo-500 hover:bg-indigo-700'}
          `}
          onClick={action.action}
          disabled={action.disabled}
        >
          {action.name}
        </button>
      ))}
    </div>
  );
};


export default ActionsCell;

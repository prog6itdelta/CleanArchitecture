import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const ButtonCell = ({ value: {onClick} }) => {
  return (
    <button
        type="button"
        className="inline-flex justify-center w-50 rounded-md border border-transparent shadow-sm px-4 py-2 mt-4 text-base font-medium text-white
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm
            bg-indigo-500 hover:bg-indigo-700"
        onClick={onClick}
    >Check Answers
  </button>
  );
};

export default ButtonCell;

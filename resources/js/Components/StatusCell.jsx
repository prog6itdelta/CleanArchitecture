import React from 'react';

const StatusCell = ({ value }) => {
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${Number(value) === 1 ? 'green' : 'red'}-100 text-${Number(value) === 1 ? 'green' : 'red'}-800`}>
      {Number(value) === 1 ? 'Active' : 'Inactive'}
    </span>
  );
};

export default StatusCell;

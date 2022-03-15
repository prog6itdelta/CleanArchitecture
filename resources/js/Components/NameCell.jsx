import React from 'react';

const NameCell = ({ value }) => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img className="h-10 w-10 rounded-full object-cover" src={value.image} alt="" />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{value.name} <span>{value.last_name}</span></div>
        <div className="text-sm text-gray-500">{value.signature}</div>
      </div>
    </div>
  );
};

export default NameCell;

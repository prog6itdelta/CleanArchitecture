import React from 'react';

const OneLineCell = ({ value }) => {
  return (
    <div className="w-full text-left overflow-hidden" title={String(value)}>
      {String(value)}
    </div>
  );
};

export default OneLineCell;

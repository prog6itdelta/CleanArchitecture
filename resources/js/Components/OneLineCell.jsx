import React from 'react';

const OneLineCell = ({ value }) => {
  return (
    <div
      className="w-full text-left overflow-hidden whitespace-pre-line"
      title={String(value)}
      style={{
        'display': '-webkit-box',
        'WebkitLineClamp': 1,
        'WebkitBoxOrient': 'vertical',
      }}
    >
      {String(value)}
    </div>
  );
};

export default OneLineCell;

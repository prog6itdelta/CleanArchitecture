import React from 'react';

export const UserContext = React.createContext();

export const initialState = {
  notification: {
    show: false,
    position: null,
    type: null,
    header: null,
    message: null
  }
};

export const resetState = (state) => state;

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        notification: {
          show: true,
          position: action.payload.position,
          type: action.payload.type,
          header: action.payload.header,
          message: action.payload.message
        }
      };
    case 'HIDE_NOTIFICATION':
      return {
        ...state,
        notification: {
          show: false,
          position: null,
          type: null,
          header: null,
          message: null
        }
      };
    case 'RESET':
      return resetState(action.payload);
    default:
      return state;
  }
};
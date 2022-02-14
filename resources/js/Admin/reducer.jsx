import React from 'react';

export const AdminContext = React.createContext();

export const initialState = {
  navigation:
    {
      currentCourse: {
        id: null,
        name: null
      },
      currentLesson: {
        id: null,
        name: null
      },
      currentQuestion: {
        id: null,
        name: null
      },
    },
  pageHeader: 'Админка',
  table: {
    page: null,
    perpage: null
  }
};

export const resetState = (state) => state;

export const adminReducer = (state, action) => {
  switch (action.type) {
    case 'CHOSE_COURSE':
      return {
        ...state,
        navigation: {
          ...state.navigation,
          currentCourse: {
            id: action.payload.id,
            name: action.payload.name ?? ''
          },
        }
      };
    case 'CHOSE_LESSON':
      return {
        ...state,
        navigation: {
          ...state.navigation,
          currentLesson: {
            id: action.payload.id,
            name: action.payload.name ?? ''
          },
        }
      };
    case 'CHOSE_QUESTION':
      return {
        ...state,
        navigation: {
          ...state.navigation,
          currentQuestion: {
            id: action.payload.id,
            name: action.payload.name ?? ''
          },
        }
      };
    case 'CHANGE_HEADER':
      return {
        ...state,
        pageHeader: action.payload
      };
    case 'UPDATE_TABLE':
      return {
        ...state,
        table: {
          pageIndex: action.payload.pageIndex,
          pageSize: action.payload.pageSize
        }
      };
    case 'RESET':
      return resetState(action.payload);
    default:
      return state;
  }
};
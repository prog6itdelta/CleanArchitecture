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
    case 'RESET':
      return resetState(action.payload);
    default:
      return state;
  }
};
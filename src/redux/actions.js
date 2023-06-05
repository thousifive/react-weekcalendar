export const SET_CURRENT_DATE = 'SET_CURRENT_DATE';
export const ADD_TASK = 'ADD_TASK';

export const setCurrentDate = (date) => {
  return {
    type: SET_CURRENT_DATE,
    payload: date,
  };
};

export const addTask = (task) => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};

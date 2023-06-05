// reducers.js
import { SET_CURRENT_DATE, ADD_TASK } from './actions';

const initialState = {
  currentDate: new Date(),
  tasks: JSON.parse(localStorage.getItem('tasks')) || {},
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_DATE:
      return {
        ...state,
        currentDate: action.payload,
      };
    case ADD_TASK:
      const newTasks = { ...state.tasks };
      if (newTasks[action.payload.date]) {
        newTasks[action.payload.date] = [
          ...newTasks[action.payload.date],
          action.payload,
        ];
      } else newTasks[action.payload.date] = [action.payload];
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return {
        ...state,
        tasks: newTasks,
      };
    default:
      return state;
  }
};

export default calendarReducer;

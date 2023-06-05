import { createStore } from 'redux';
import calendarReducer from './reducers';

const store = createStore(calendarReducer);

export default store;

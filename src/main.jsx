import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Calendar from './components/Calendar';
import Grid from './components/Grid';

ReactDOM.render(
  <Provider store={store}>
    <Calendar />
    {/* <Grid /> */}
  </Provider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import App from './App';
import store from './app/store';
import './index.css';
const queryClient = new QueryClient();

const AppWrapper = () => (
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(
  <AppWrapper />,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';

import App from './App';
import store from './app/store';
import './index.css';
const queryClient = new QueryClient();

const theme = createMuiTheme({
  palette: {
    primary: {main: '#005073'},
    secondary: {main: '#049FD9'},
    warning: {main: '#FBAB18'},
    error: {main: '#E2231A'},
    info: {main: '#6EBE4A'},
    gray: {main: '#B3B5B5'},
    offwhite: {main: '#FAFAFA'},
  },
});

const AppWrapper = () => (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

ReactDOM.render(
  <AppWrapper />,
  document.getElementById('root')
);

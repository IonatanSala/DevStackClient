import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import routes from './routes';

// configure redux store;
import configureStore from './store'
let store = configureStore();

// set components in english
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

ReactDOM.render(
  <Provider store={store} >
    <LocaleProvider locale={enUS}>
      <Router routes={routes} history={browserHistory} />
    </LocaleProvider>
  </Provider>
  , document.getElementById('root')
);

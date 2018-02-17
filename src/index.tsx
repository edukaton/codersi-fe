import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app/App';
import { configureStore } from './store';

// import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/dist/yeti/bootstrap.css';

import './index.css';

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

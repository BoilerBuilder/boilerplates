import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import { Provider } from 'react-redux';
import { store } from './store';

import '@/styles/app.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
);

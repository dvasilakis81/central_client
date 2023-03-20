import React from 'react';
import reportWebVitals from './reportWebVitals';
import {createRoot} from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/routes'
import store from './Redux/Store/store'
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <BrowserRouter style={{ overflowY: 'hidden'}}>
      <AppRoutes />
    </BrowserRouter>
  </Provider>
  );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

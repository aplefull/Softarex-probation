import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { store as toolkitStore } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={toolkitStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

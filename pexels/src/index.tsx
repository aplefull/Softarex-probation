import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { rootReducer } from './redux/rootReducer';
import thunk from 'redux-thunk';

// @ts-ignore
const devtoolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
// @ts-ignore
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : undefined;

const composeArray: Function[] = [applyMiddleware(thunk), devtoolsExtension as Function].filter(
  Boolean
);

const store = createStore(rootReducer, compose(...composeArray));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

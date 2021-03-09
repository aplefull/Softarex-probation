import { combineReducers } from 'redux';
import { headerReducer } from './headerReducer';
import { photosReducer } from './photosReducer';

export const rootReducer = combineReducers({
  headerReducer: headerReducer,
  photosReducer: photosReducer,
});

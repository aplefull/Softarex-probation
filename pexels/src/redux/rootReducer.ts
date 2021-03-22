import { combineReducers } from 'redux';
import { headerReducer } from './headerReducer';
import { photosReducer } from './photosReducer';
import {dropdownReducer} from "./dropdownReducer";

export const rootReducer = combineReducers({
  headerReducer: headerReducer,
  photosReducer: photosReducer,
  dropdownReducer: dropdownReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

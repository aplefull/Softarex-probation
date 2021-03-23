import { combineReducers } from 'redux';
import { headerReducer } from './headerReducer';
import { photosReducer } from './photosReducer';
import {dropdownReducer} from "./dropdownReducer";
import {searchBarReducer} from "./searchBarReducer";

export const rootReducer = combineReducers({
  headerReducer: headerReducer,
  photosReducer: photosReducer,
  dropdownReducer: dropdownReducer,
  searchBarReducer: searchBarReducer
});

export type RootState = ReturnType<typeof rootReducer>;

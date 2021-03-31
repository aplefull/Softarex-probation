import { combineReducers } from 'redux';
import { headerReducer } from './headerReducer';
import { photosReducer } from './photosReducer';
import { dropdownReducer } from './dropdownReducer';
import { searchBarReducer } from './searchBarReducer';
import { filtersReducer } from './filtersReducer';

export const rootReducer = combineReducers({
  headerReducer: headerReducer,
  photosReducer: photosReducer,
  dropdownReducer: dropdownReducer,
  searchBarReducer: searchBarReducer,
  filterReducer: filtersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

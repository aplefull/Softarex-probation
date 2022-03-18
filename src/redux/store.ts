import { configureStore } from '@reduxjs/toolkit';
import photosSlice from './photosSlice';
import filtersSlice from './filtersSlice';
import searchBarSlice from './searchBarSlice';

export const store = configureStore({
  reducer: {
    photos: photosSlice,
    filters: filtersSlice,
    searchBar: searchBarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

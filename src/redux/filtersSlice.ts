import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { performSearch } from './photosSlice';
import { RootState } from './store';

type InitialFiltersStateTypes = {
  orientation: string;
  size: string;
  color: string;
};

const initialState: InitialFiltersStateTypes = {
  orientation: 'all',
  size: 'all',
  color: 'all',
};

export const changeColorFilter = createAsyncThunk(
  'filters/changeColorFilter',
  async (color: string, { dispatch, getState }) => {
    await dispatch(setColorFilter(color));
    const { photos } = getState() as RootState;
    dispatch(
      performSearch({
        // eslint-disable-next-line no-restricted-globals
        value: (location.pathname.match(/(?<=\/)[^/]*$/) || [''])[0],
        page: photos.currentPage,
        shouldClearPhotos: true,
      })
    );
  }
);

export const changeSizeFilter = createAsyncThunk(
  'filters/changeSizeFilter',
  async (size: string, { dispatch, getState }) => {
    await dispatch(setSizeFilter(size));
    const { photos } = getState() as RootState;
    dispatch(
      performSearch({
        // eslint-disable-next-line no-restricted-globals
        value: (location.pathname.match(/(?<=\/)[^/]*$/) || [''])[0],
        page: photos.currentPage,
        shouldClearPhotos: true,
      })
    );
  }
);

export const changeOrientationFilter = createAsyncThunk(
  'filters/changeOrientationFilter',
  async (orientation: string, { dispatch, getState }) => {
    await dispatch(setOrientationFilter(orientation));
    const { photos } = getState() as RootState;
    dispatch(
      performSearch({
        // eslint-disable-next-line no-restricted-globals
        value: (location.pathname.match(/(?<=\/)[^/]*$/) || [''])[0],
        page: photos.currentPage,
        shouldClearPhotos: true,
      })
    );
  }
);

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setColorFilter: (state, action) => {
      state.color = action.payload;
    },
    setOrientationFilter: (state, action) => {
      state.orientation = action.payload;
    },
    setSizeFilter: (state, action) => {
      state.size = action.payload;
    },
  },
});

export const { setColorFilter, setOrientationFilter, setSizeFilter } = filtersSlice.actions;

export default filtersSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { performSearch } from './photosSlice';

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
  async (color: string, { dispatch }) => {
    await dispatch(setColorFilter(color));
    dispatch(
      performSearch({
        // eslint-disable-next-line no-restricted-globals
        value: (location.pathname.match(/(?<=\/)[^/]*$/) || [''])[0],
        page: 1,
        shouldClearPhotos: true,
      })
    );
  }
);

export const changeSizeFilter = createAsyncThunk(
  'filters/changeSizeFilter',
  async (size: string, { dispatch }) => {
    await dispatch(setSizeFilter(size));

    dispatch(
      performSearch({
        // eslint-disable-next-line no-restricted-globals
        value: (location.pathname.match(/(?<=\/)[^/]*$/) || [''])[0],
        page: 1,
        shouldClearPhotos: true,
      })
    );
  }
);

export const changeOrientationFilter = createAsyncThunk(
  'filters/changeOrientationFilter',
  async (orientation: string, { dispatch }) => {
    await dispatch(setOrientationFilter(orientation));

    dispatch(
      performSearch({
        // eslint-disable-next-line no-restricted-globals
        value: (location.pathname.match(/(?<=\/)[^/]*$/) || [''])[0],
        page: 1,
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

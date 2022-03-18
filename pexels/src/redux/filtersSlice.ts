import { createSlice } from '@reduxjs/toolkit';

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

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeColorFilter: (state, action) => {
      state.color = action.payload;
    },
    changeOrientationFilter: (state, action) => {
      state.orientation = action.payload;
    },
    changeSizeFilter: (state, action) => {
      state.size = action.payload;
    },
  },
});

export const { changeColorFilter, changeOrientationFilter, changeSizeFilter } = filtersSlice.actions;

export default filtersSlice.reducer;

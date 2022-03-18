import { createSlice } from '@reduxjs/toolkit';

type InitialSearchBarStateTypes = {
  inputValue: string;
};

const initialState: InitialSearchBarStateTypes = {
  inputValue: '',
};

export const searchBarSlice = createSlice({
  name: 'search-bar',
  initialState,
  reducers: {
    handleInputChange: (state, action) => {
      state.inputValue = action.payload;
    },
  },
});

export const { handleInputChange } = searchBarSlice.actions;

export default searchBarSlice.reducer;

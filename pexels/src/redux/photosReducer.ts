import { HIDE_LOADING, LOAD_PHOTOS, SHOW_LOADING } from './types';

const initialState = {
  photos: [],
  currentPage: 1,
  isLoading: false,
};

export function photosReducer(
  state: any = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case LOAD_PHOTOS:
      return {
        ...state,
        photos: state.photos.concat(action.payload.photos),
        currentPage: state.currentPage + 1,
      };
    case SHOW_LOADING:
      return { ...state, isLoading: true };
    case HIDE_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}


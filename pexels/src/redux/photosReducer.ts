import {
  HIDE_LOADING,
  HIDE_MODAL,
  LOAD_PHOTOS,
  SHOW_LOADING,
  SHOW_MODAL,
} from './types';

const initialState = {
  photos: [],
  currentPage: 1,
  isLoading: false,
  isHidden: true,
  modalID: null,
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
    case SHOW_MODAL:
      return { ...state, isHidden: false, modalID: action.payload };
    case HIDE_MODAL:
      return { ...state, isHidden: true };
    default:
      return state;
  }
}

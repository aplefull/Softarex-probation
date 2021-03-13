import { LOAD_PHOTOS } from './types';

const initialState = {
  photos: [],
  currentPage: 1
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
        currentPage: state.currentPage + 1
      };
    default:
      return state;
  }
}

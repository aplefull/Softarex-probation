import { LOAD_PHOTOS } from './types';

const initialState = {
  photos: [],
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
      };
    default:
      return state;
  }
}

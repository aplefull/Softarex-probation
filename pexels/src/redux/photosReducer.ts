import {
  HIDE_LOADING,
  HIDE_MODAL,
  LOAD_PHOTOS,
  PERFORM_SEARCH,
  SHOW_LOADING,
  SHOW_MODAL,
} from './types';

const initialState = {
  photos: [],
  newPhotos: [],
  columnsArray: [[], [], [], []],
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
      let factor: number;

      if (window.innerWidth < 624) {
        factor = 1;
      } else if (window.innerWidth < 900) {
        factor = 2;
      } else if (window.innerWidth < 1160) {
        factor = 3;
      } else {
        factor = 4;
      }

      let chunkLength = Math.floor(action.payload.photos.length / factor);
      for (let i = 0; i < factor; i++) {
        state.columnsArray[i].push(
          ...action.payload.photos.slice(
            i * chunkLength,
            i * chunkLength + chunkLength
          )
        );
      }

      return {
        ...state,
        photos: state.photos.concat(action.payload.photos),
        newPhotos: action.payload.photos,
        currentPage: state.currentPage + 1,
      };
    case PERFORM_SEARCH:
      return {
        ...state,
        photos: [],
        newPhotos: [],
        columnsArray: [[], [], [], []],
        currentPage: 2,
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

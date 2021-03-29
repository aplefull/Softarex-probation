import {
  ADD_COLLECTIBLE,
  ADD_LIKE,
  CHANGE_COLUMNS_NUMBER,
  HIDE_LOADING,
  HIDE_MODAL,
  INIT_COLLECTIBLES,
  INIT_LIKES,
  LOAD_COLLECTION_PHOTOS,
  LOAD_PHOTOS,
  PERFORM_SEARCH,
  REMOVE_COLLECTIBLE,
  REMOVE_LIKE,
  SHOW_LOADING,
  SHOW_MODAL,
} from './types';

export interface PhotoInfoType {
  landscape?: string;
  large?: string;
  large2x?: string;
  medium?: string;
  original: string;
  portrait?: string;
  small?: string;
  tiny?: string;
}

export interface PhotoObjectTypes {
  avg_color: string;
  height: number;
  width: number;
  id: number;
  liked: boolean;
  photographer: string;
  photographer_id: number;
  photographer_url: string;
  url: string;
  src: PhotoInfoType;
}

interface InitialPhotosStateTypes {
  photos: PhotoObjectTypes[];
  currentPage: number;
  isLoading: boolean;
  isHidden: boolean;
  modalID: string | null;
  columnsNumber: number;
  liked: Array<number>;
  collected: Array<number>;
}

const initialState: InitialPhotosStateTypes = {
  photos: [],
  currentPage: 1,
  isLoading: false,
  isHidden: true,
  modalID: null,
  columnsNumber: 4,
  liked: [],
  collected: [],
};

export function photosReducer(
  state: InitialPhotosStateTypes = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case LOAD_PHOTOS:
      return {
        ...state,
        photos: state.photos.concat(action.payload.photos),
        currentPage: state.currentPage + 1,
      };

    case PERFORM_SEARCH:
      return {
        ...state,
        photos: [],
        currentPage: 2,
      };

    case INIT_LIKES:
      return {
        ...state,
        liked: JSON.parse(localStorage.getItem('likes') ?? '[]'),
      };

    case ADD_LIKE: {
      localStorage.setItem(
        'likes',
        JSON.stringify(state.liked.concat(action.payload))
      );
      return {
        ...state,
        liked: state.liked.concat(action.payload),
      };
    }

    case REMOVE_LIKE: {
      state.liked.splice(state.liked.indexOf(action.payload), 1);
      localStorage.setItem('likes', JSON.stringify(state.liked));
      return {
        ...state,
        liked: [...state.liked],
      };
    }

    case INIT_COLLECTIBLES:
      return {
        ...state,
        collected: JSON.parse(localStorage.getItem('collected') ?? '[]'),
      };

    case ADD_COLLECTIBLE: {
      localStorage.setItem(
        'collected',
        JSON.stringify(state.collected.concat(action.payload))
      );
      return {
        ...state,
        collected: state.collected.concat(action.payload),
      };
    }

    case REMOVE_COLLECTIBLE: {
      state.collected.splice(state.collected.indexOf(action.payload), 1);
      localStorage.setItem('collected', JSON.stringify(state.collected));
      return {
        ...state,
        collected: [...state.collected],
      };
    }

    case CHANGE_COLUMNS_NUMBER: {
      return {
        ...state,
        columnsNumber: action.payload,
      };
    }

    case LOAD_COLLECTION_PHOTOS: {
      return {
        ...state,
        photos: state.photos.concat([action.payload]),
      };
    }

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

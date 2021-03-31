import {
  CHANGE_COLOR_FILTER,
  CHANGE_ORIENTATION_FILTER,
  CHANGE_SIZE_FILTER,
} from './types';

interface InitialFiltersStateTypes {
  orientation: string;
  size: string;
  color: string;
}

const initialState: InitialFiltersStateTypes = {
  orientation: 'all',
  size: 'all',
  color: 'all',
};

export function filtersReducer(
  state: InitialFiltersStateTypes = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case CHANGE_SIZE_FILTER:
      return {
        ...state,
        size: action.payload,
      };
    case CHANGE_ORIENTATION_FILTER:
      return {
        ...state,
        orientation: action.payload,
      };
    case CHANGE_COLOR_FILTER:
      return {
        ...state,
        color: action.payload,
      };

    default:
      return state;
  }
}

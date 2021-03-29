import { INPUT_VALUE_CHANGE } from './types';

interface InitialSearchbarStateTypes {
  inputValue: string;
}

const initialState: InitialSearchbarStateTypes = {
  inputValue: '',
};

export function searchBarReducer(
  state: InitialSearchbarStateTypes = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case INPUT_VALUE_CHANGE:
      return {
        ...state,
        inputValue: action.payload,
      };
    default:
      return state;
  }
}

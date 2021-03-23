import { INPUT_VALUE_CHANGE } from './types';

const initialState = {
  inputValue: '',
};

export function searchBarReducer(
  state: any = initialState,
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

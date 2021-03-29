import { CHANGE_SIZE_OPTION } from './types';

interface InitialDropdownStateTypes {
  selectedOption: string;
}

const initialState = {
  selectedOption: 'original',
};

export function dropdownReducer(
  state: InitialDropdownStateTypes = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case CHANGE_SIZE_OPTION:
      return { ...state, selectedOption: action.payload };
    default:
      return state;
  }
}

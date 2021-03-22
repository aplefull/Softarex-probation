import {CHANGE_SIZE_OPTION} from "./types";

const initialState = {
  selectedOption: 'original',
};

export function dropdownReducer(
  state: any = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case CHANGE_SIZE_OPTION:
      return {...state, selectedOption: action.payload}
    default:
      return state;
  }
}

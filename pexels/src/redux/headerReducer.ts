import { HIDE_SEARCH_BAR, LOAD_HEADER_IMAGE, SHOW_SEARCH_BAR } from "./types";

const initialState = {
  headerImage: "",
  isHidden: true,
  authorName: "",
  authorLink: "",
};

export function headerReducer(
  state: Object = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case LOAD_HEADER_IMAGE:
      const imageNumber = ~~(Math.random() * 20);
      return {
        ...state,
        headerImage: `${action.payload.photos[imageNumber].src.original}?auto=compress&crop=focalpoint&cs=tinysrgb&dpr=2&h=1000&w=2000`,
        authorName: action.payload.photos[imageNumber].photographer,
        authorLink: action.payload.photos[imageNumber].url,
      };
    case SHOW_SEARCH_BAR:
      return { ...state, isHidden: false };
    case HIDE_SEARCH_BAR:
      return { ...state, isHidden: true };
    default:
      return state;
  }
}

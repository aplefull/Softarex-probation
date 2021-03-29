import { LOAD_HEADER_IMAGE } from './types';

interface InitialHeaderStateTypes {
  headerImage: string;
  authorName: string;
  authorLink: string;
}

const initialState: InitialHeaderStateTypes = {
  headerImage: '',
  authorName: '',
  authorLink: '',
};

export function headerReducer(
  state: InitialHeaderStateTypes = initialState,
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
    default:
      return state;
  }
}

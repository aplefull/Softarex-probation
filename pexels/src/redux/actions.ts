import {
  HIDE_SEARCH_BAR,
  LOAD_HEADER_IMAGE,
  LOAD_PHOTOS,
  SHOW_SEARCH_BAR,
} from './types';

export function getHeaderImage() {
  return async (dispatch: Function) => {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=mountains&orientation=landscape&size=medium&per_page=20&page=1`,
      {
        headers: {
          Authorization:
            '563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf',
        },
      }
    );
    const json = await response.json();
    dispatch({ type: LOAD_HEADER_IMAGE, payload: json });
  };
}

export function showSearchBar() {
  return (dispatch: Function) => {
    dispatch({ type: SHOW_SEARCH_BAR });
  };
}

export function hideSearchBar() {
  return (dispatch: Function) => {
    dispatch({ type: HIDE_SEARCH_BAR });
  };
}

export function loadPhotos(page: number) {
  console.log('photos loaded', page);
  return async (dispatch: Function) => {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?per_page=20&&page=${page}`,
      {
        headers: {
          Authorization:
            '563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf',
        },
      }
    );
    const json = await response.json();
    dispatch({ type: LOAD_PHOTOS, payload: json });
  };
}

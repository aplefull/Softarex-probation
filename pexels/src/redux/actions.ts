import {
  LOAD_HEADER_IMAGE,
  LOAD_PHOTOS,
  SHOW_LOADING,
  HIDE_LOADING,
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

export function loadPhotos(page: number) {
  console.log('photos loaded', page);
  return async (dispatch: Function) => {
    dispatch(showLoading());
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
    dispatch(hideLoading());
  };
}

export function showLoading() {
  return {
    type: SHOW_LOADING,
  };
}

export function hideLoading() {
  return {
    type: HIDE_LOADING,
  };
}

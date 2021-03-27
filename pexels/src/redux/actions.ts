import {
  LOAD_HEADER_IMAGE,
  LOAD_PHOTOS,
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_MODAL,
  HIDE_MODAL,
  CHANGE_SIZE_OPTION,
  INPUT_VALUE_CHANGE,
  PERFORM_SEARCH,
  REMOVE_LIKE,
  ADD_LIKE,
  INIT_LIKES,
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

export function showModal(id: number) {
  return (dispatch: Function) => {
    dispatch({
      type: SHOW_MODAL,
      payload: id,
    });
  };
}

export function hideModal() {
  return (dispatch: Function) => {
    dispatch({
      type: HIDE_MODAL,
    });
  };
}

export function changeSizeOption(option: string) {
  return (dispatch: Function) => {
    dispatch({
      type: CHANGE_SIZE_OPTION,
      payload: option,
    });
  };
}

export function handleInputChange(value: string) {
  return (dispatch: Function) => {
    dispatch({
      type: INPUT_VALUE_CHANGE,
      payload: value,
    });
  };
}

export function performSearch(value: string, page: number) {
  return async (dispatch: Function) => {
    dispatch({
      type: PERFORM_SEARCH,
    });
    dispatch(showLoading());
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${value}&per_page=20&&page=${page}`,
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

export function loadSearchedPhotos(value: string, page: number) {
  return async (dispatch: Function) => {
    dispatch(showLoading());
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${value}&per_page=20&&page=${page}`,
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

export function initLikes() {
  return (dispatch: Function) => {
    dispatch({
      type: INIT_LIKES,
    });
  };
}

export function addLike(id: string) {
  return (dispatch: Function) => {
    dispatch({
      type: ADD_LIKE,
      payload: id,
    });
  };
}

export function removeLike(id: string) {
  return (dispatch: Function) => {
    dispatch({
      type: REMOVE_LIKE,
      payload: id,
    });
  };
}

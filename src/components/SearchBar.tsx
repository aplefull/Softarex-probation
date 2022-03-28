import React, { ChangeEvent, KeyboardEvent, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleInputChange } from '../redux/searchBarSlice';
import { performSearch } from '../redux/photosSlice';
import { RootState } from '../redux/store';
import icon from '../assets/icons/magnifying-glass.svg';
import styles from '../css/components/SearchBar.module.scss';
import cx from 'classnames';

type PropTypes = {
  isHidden?: boolean;
  width?: number;
  height?: number;
};

function SearchBar({ isHidden, width, height }: PropTypes) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { inputValue } = useSelector((state: RootState) => state.searchBar);
  const { currentPage } = useSelector((state: RootState) => state.photos);
  const { color, size, orientation } = useSelector((state: RootState) => state.filters);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(handleInputChange(e.target.value));
    },
    [dispatch]
  );

  const search = useCallback(() => {
    history.push(`/search/${encodeURIComponent(inputValue)}`);
    window.scrollTo(0, 0);
    let searchQuery = inputValue;

    dispatch(
      performSearch({
        value: searchQuery,
        page: currentPage,
        shouldClearPhotos: true,
      })
    );
  }, [inputValue, currentPage, history, dispatch]);

  const onKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter' && inputValue.trim().length > 0) {
        search();
      }
    },
    [inputValue, search]
  );

  const onSearchClick = useCallback(() => {
    if (inputValue.trim().length > 0) {
      search();
    }
  }, [inputValue, search]);

  const searchBarHeight = useMemo(() => {
    return height ? `${height}px` : '';
  }, [height]);

  const searchBarWidth = useMemo(() => {
    return width ? `${width}px` : '';
  }, [width]);

  return (
    <div
      className={cx(styles.inputWrapper, { [styles.hidden]: isHidden })}
      style={{
        height: searchBarHeight,
        width: searchBarWidth,
      }}
    >
      <input
        type="text"
        placeholder="Search for free photos"
        value={inputValue}
        onChange={onInputChange}
        onKeyPress={onKeyPress}
      />
      <img src={icon} alt="search icon" onClick={onSearchClick} />
    </div>
  );
}

export default SearchBar;

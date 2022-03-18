import React, { ChangeEvent, KeyboardEvent } from 'react';
import styles from '../css/components/SearchBar.module.scss';
import icon from '../assets/icons/magnifying-glass.svg';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleInputChange } from '../redux/searchBarSlice';
import { performSearch } from '../redux/photosSlice';
import { RootState } from '../redux/store';

interface PropTypes {
  isHidden?: boolean;
  width?: number;
  height?: number;
}

function SearchBar(props: PropTypes) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { inputValue } = useSelector((state: RootState) => state.searchBar);
  const { currentPage } = useSelector((state: RootState) => state.photos);
  const { color, size, orientation } = useSelector((state: RootState) => state.filters);

  return (
    <div
      className={`${styles.inputWrapper} ${props?.isHidden ? styles.hidden : ''}`}
      style={{
        height: props.height ? `${props.height}px` : '',
        width: props.width ? `${props.width}px` : '',
      }}
    >
      <input
        type="text"
        placeholder="Search for free photos"
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          dispatch(handleInputChange(e.target.value));
        }}
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.code === 'Enter' && inputValue.trim().length > 0) {
            history.push(`/search/${encodeURIComponent(inputValue)}`);
            window.scrollTo(0, 0);
            let searchQuery = inputValue;

            if (color !== 'all') searchQuery += `&color=${color}`;
            if (size !== 'all') searchQuery += `&size=${size}`;
            if (orientation !== 'all') searchQuery += `&orientation=${orientation}`;

            dispatch(
              performSearch({
                value: searchQuery,
                page: currentPage,
              })
            );
          }
        }}
      />
      <img
        src={icon}
        alt="search icon"
        onClick={() => {
          if (inputValue.trim().length > 0) {
            history.push(`/search/${encodeURIComponent(inputValue)}`);
            window.scrollTo(0, 0);
            let searchQuery = inputValue;

            if (color !== 'all') searchQuery += `&color=${color}`;
            if (size !== 'all') searchQuery += `&size=${size}`;
            if (orientation !== 'all') searchQuery += `&orientation=${orientation}`;

            dispatch(
              performSearch({
                value: searchQuery,
                page: currentPage,
              })
            );
          }
        }}
      />
    </div>
  );
}

export default SearchBar;

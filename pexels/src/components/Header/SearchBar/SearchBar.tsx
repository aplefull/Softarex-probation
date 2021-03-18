import React from 'react';
import styles from './SearchBar.module.scss';
import icon from '../../../icons/magnifying-glass.svg';

interface propTypes {
  isHidden?: boolean;
  width?: number;
  height?: number;
}

function SearchBar(props: propTypes) {
  return (
    <div
      className={`${styles.inputWrapper} ${
        props?.isHidden ? styles.hidden : ''
      }`}
      style={{
        height: props.height ? `${props.height}px` : '',
        width: props.width ? `${props.width}px` : '',
      }}
    >
      <input type="text" placeholder="Search for free photos" />
      <img src={icon} alt="icon" />
    </div>
  );
}

export default SearchBar;

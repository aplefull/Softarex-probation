import React from 'react';
import styles from './SearchBar.module.scss';
import icon from '../../../icons/magnifying-glass.svg';

function SearchBar() {
  return (
    <div className={styles.inputWrapper}>
      <input type="text" placeholder="Search for free photos" />
      <img src={icon} alt="icon" />
    </div>
  );
};

export default SearchBar;

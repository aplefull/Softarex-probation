import React from 'react';
import logo from '../../../images/logo.png';
import icon from '../../../icons/ellipsis.svg';
import SearchBar from '../SearchBar/SearchBar';
import styles from './NavBar.module.scss';

function NavBar() {
  return (
    <div className={styles.navbar}>
      <a className={styles.navbar__logoWrapper}>
        <img src={logo} alt="logo" />
        <p>Pexels</p>
      </a>
      <SearchBar />
      <div className={styles.navbar__navigationWrapper}>
        <ul className={styles.navigationLinks}>
          <li>
            <a href="">Explore</a>
          </li>
          <li>
            <a href="">License</a>
          </li>
          <li>
            <a href="">Upload</a>
          </li>
          <li>
            <img src={icon} alt="ellipsis"/>
          </li>
        </ul>
        <button className="join-button">Join</button>
      </div>
    </div>
  );
};

export default NavBar;

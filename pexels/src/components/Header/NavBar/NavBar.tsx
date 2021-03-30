import React from 'react';
import logo from '../../../images/logo.png';
import icon from '../../../icons/ellipsis.svg';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';

interface PropTypes {
  isHidden: boolean;
}

function NavBar(props: PropTypes) {
  return (
    <div
      className={`${styles.navbar} ${props.isHidden ? '' : styles.showColor}`}
    >
      <a className={styles.logoWrapper} href={'/'}>
        <img src={logo} alt="logo" />
        <p>Pexels</p>
      </a>
      <SearchBar isHidden={props.isHidden} width={714} height={46}/>
      <div className={styles.navigationWrapper}>
        <ul className={styles.navigationLinks}>
          <li>
            <Link to={'/collection'}>Collection</Link>
          </li>
          <li>
            <a href={'https://www.pexels.com/license/'}>License</a>
          </li>
          <li>
            <a href={'https://www.pexels.com/join-contributor/'}>Upload</a>
          </li>
          <li>
            <img src={icon} alt="ellipsis" />
          </li>
        </ul>
        <button className="join-button">Join</button>
      </div>
    </div>
  );
}

export default NavBar;

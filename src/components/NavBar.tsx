import { Link } from 'react-router-dom';
import cx from 'classnames';
import logo from '../assets/icons/logo.svg';
import icon from '../assets/icons/ellipsis.svg';
import styles from '../css/components/NavBar.module.scss';
import SearchBar from './SearchBar';

type PropTypes = {
  isHidden: boolean;
};

function NavBar({ isHidden }: PropTypes) {
  return (
    <div className={cx(styles.navbar, { [styles.showColor]: !isHidden })}>
      <a className={styles.logoWrapper} href="/">
        <img src={logo} alt="logo" />
        <p>Pexels</p>
      </a>
      <SearchBar isHidden={isHidden} width={714} height={46} />
      <div className={styles.navigationWrapper}>
        <ul className={styles.navigationLinks}>
          <li>
            <Link to="/collection">Collection</Link>
          </li>
          <li>
            <a href="https://www.pexels.com/license/">License</a>
          </li>
          <li>
            <a href="https://www.pexels.com/join-contributor/">Upload</a>
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

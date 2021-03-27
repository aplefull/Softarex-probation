import React from 'react';
import styles from './SearchHeader.module.scss';
import NavBar from '../Header/NavBar/NavBar';
import { ReactComponent as PhotoIcon } from '../../icons/photo.svg';
import { ReactComponent as VideoIcon } from '../../icons/video.svg';
import { ReactComponent as UserIcon } from '../../icons/user.svg';
import { useLocation } from 'react-router-dom';
import FilterButton from "./FilterButton/FilterButton";

function SearchHeader() {
  const location = useLocation();

  return (
    <div className={styles.searchHeaderWrapper}>
      <NavBar isHidden={false} />
      <div className={styles.searchHeaderTabs}>
        <div className={styles.leftTabs}>
          <div className={styles.tab}>
            <PhotoIcon className={styles.svgIcon} />
            <p>Photos</p>
            <span> · 122K</span>
          </div>
          <div className={styles.tab}>
            <VideoIcon className={styles.svgIcon} />
            <p>Videos</p>
            <span> · 122K</span>
          </div>
          <div className={styles.tab}>
            <UserIcon className={styles.svgIcon} />
            <p>Users</p>
            <span> · 122K</span>
          </div>
        </div>
        <div className={styles.rightTabs}>
          <FilterButton caption={'Orientation'} />
          <FilterButton caption={'Size'} />
          <FilterButton caption={'Color'} />
        </div>
      </div>
      <h1>
        {`${decodeURIComponent(
          (location.pathname.match(/(?<=\/)[^/]*$/) || [''])[0]
        )} Photos`}
      </h1>
    </div>
  );
}

export default SearchHeader;

import React from 'react';
import styles from './SearchHeader.module.scss';
import NavBar from '../Header/NavBar/NavBar';
import { ReactComponent as PhotoIcon } from '../../icons/photo.svg';
import { ReactComponent as VideoIcon } from '../../icons/video.svg';
import { ReactComponent as UserIcon } from '../../icons/user.svg';
import { ReactComponent as OrientationIcon } from '../../icons/orientation.svg';
import { ReactComponent as SizeIcon } from '../../icons/size.svg';
import { ReactComponent as ColorIcon } from '../../icons/color.svg';
import {useSelector} from "react-redux";

const SearchHeader = () => {
  let title = useSelector((state: any) => state.searchBarReducer.inputValue);

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
          <div className={styles.tab}>
            <OrientationIcon className={styles.svgIcon} />
            <p>Orientation</p>
          </div>
          <div className={styles.tab}>
            <SizeIcon className={styles.svgIcon} />
            <p>Size</p>
          </div>
          <div className={styles.tab}>
            <ColorIcon className={styles.svgIcon} />
            <p>Color</p>
          </div>
        </div>
      </div>
      <h1>{title}</h1>
    </div>
  );
};

export default SearchHeader;

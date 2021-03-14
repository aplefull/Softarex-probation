import React from 'react';
import styles from './Photo.module.scss';
import downloadIcon from '../../../../icons/download.svg';
import heartIcon from '../../../../icons/heart.svg';
import addIcon from '../../../../icons/add.svg';

interface propTypes {
  photoLink: string;
  photographerURL: string;
  photographerName: string;
  photoId: string;
}

function Photo(props: propTypes) {
  return (
    <div className={styles.photoWrapper}>
      <img src={props.photoLink} alt={'p-card'} className={styles.photoImage} />
      <div className={styles.overlay}>
        <div className={styles.authorLinkWrapper}>
          <a href={props.photographerURL}>{props.photographerName}</a>
        </div>
        <div className={styles.otherLinksWrapper}>
          <a href={`https://www.pexels.com/photo/${props.photoId}/download`}>
            <img src={downloadIcon} alt={'download icon'} />
          </a>
          <a href="">
            <img src={addIcon} alt={'add icon'} />
          </a>
          <a href="">
            <img src={heartIcon} alt={'heart icon'} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Photo;

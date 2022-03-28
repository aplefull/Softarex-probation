import React, { useCallback } from 'react';
import styles from '../css/components/Photo.module.scss';
import { ReactComponent as DownloadIcon } from '../assets/icons/download.svg';
import { ReactComponent as HeartIcon } from '../assets/icons/heart.svg';
import { ReactComponent as HeartFilledIcon } from '../assets/icons/heart-filled.svg';
import { ReactComponent as AddIcon } from '../assets/icons/add.svg';
import { ReactComponent as AddCircledIcon } from '../assets/icons/check-mark-circled.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addCollectible, addLike, removeCollectible, removeLike } from '../redux/photosSlice';
import { RootState } from '../redux/store';

type PropTypes = {
  onPhotoClick: () => void;
  photoLink: string;
  photographerURL: string;
  photographerName: string;
  photoId: number;
};

function Photo({ onPhotoClick, photoId, photographerName, photoLink, photographerURL }: PropTypes) {
  const dispatch = useDispatch();
  const { liked, collected } = useSelector((state: RootState) => state.photos);

  const handleCollectClick = useCallback(() => {
    if (collected.includes(photoId)) {
      dispatch(removeCollectible(photoId));
    } else {
      dispatch(addCollectible(photoId));
    }
  }, [collected, photoId, dispatch]);

  const handleLikeClick = useCallback(() => {
    if (liked.includes(photoId)) {
      dispatch(removeLike(photoId));
    } else {
      dispatch(addLike(photoId));
    }
  }, [liked, photoId, dispatch]);

  return (
    <div className={styles.photoWrapper}>
      <img src={photoLink} alt="p-card" className={styles.photoImage} onClick={onPhotoClick} />
      <div className={styles.overlay}>
        <div className={styles.authorLinkWrapper}>
          <a href={photographerURL}>{photographerName}</a>
        </div>
        <div className={styles.otherLinksWrapper}>
          <a href={`https://www.pexels.com/photo/${photoId}/download`}>
            <DownloadIcon />
          </a>
          <span>
            {collected.includes(photoId) ? (
              <AddCircledIcon onClick={handleCollectClick} />
            ) : (
              <AddIcon onClick={handleCollectClick} />
            )}
          </span>
          <span>
            {liked.includes(photoId) ? (
              <HeartFilledIcon onClick={handleLikeClick} />
            ) : (
              <HeartIcon onClick={handleLikeClick} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Photo;

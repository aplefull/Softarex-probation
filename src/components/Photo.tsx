import React from 'react';
import styles from '../css/components/Photo.module.scss';
import { ReactComponent as DownloadIcon } from '../assets/icons/download.svg';
import { ReactComponent as HeartIcon } from '../assets/icons/heart.svg';
import { ReactComponent as HeartFilledIcon } from '../assets/icons/heart-filled.svg';
import { ReactComponent as AddIcon } from '../assets/icons/add.svg';
import { ReactComponent as AddCircledIcon } from '../assets/icons/check-mark-circled.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addCollectible, addLike, removeCollectible, removeLike } from '../redux/photosSlice';
import { RootState } from '../redux/store';

interface PropTypes {
  onPhotoClick: (id: number | null) => React.MouseEventHandler;
  photoLink: string;
  photographerURL: string;
  photographerName: string;
  photoId: number;
  photoURL: string;
}

function Photo(props: PropTypes) {
  const dispatch = useDispatch();
  const { liked, collected } = useSelector((state: RootState) => state.photos);

  return (
    <div className={styles.photoWrapper}>
      <img
        src={props.photoLink}
        alt={'p-card'}
        className={styles.photoImage}
        onClick={props.onPhotoClick(props.photoId)}
      />
      <div className={styles.overlay}>
        <div className={styles.authorLinkWrapper}>
          <a href={props.photographerURL}>{props.photographerName}</a>
        </div>
        <div className={styles.otherLinksWrapper}>
          <a href={`https://www.pexels.com/photo/${props.photoId}/download`}>
            <DownloadIcon />
          </a>
          <span>
            {collected.includes(props.photoId) ? (
              <AddCircledIcon
                onClick={() => {
                  if (collected.includes(props.photoId)) {
                    dispatch(removeCollectible(props.photoId));
                  } else {
                    dispatch(addCollectible(props.photoId));
                  }
                }}
              />
            ) : (
              <AddIcon
                onClick={() => {
                  if (collected.includes(props.photoId)) {
                    dispatch(removeCollectible(props.photoId));
                  } else {
                    dispatch(addCollectible(props.photoId));
                  }
                }}
              />
            )}
          </span>
          <span>
            {liked.includes(props.photoId) ? (
              <HeartFilledIcon
                onClick={() => {
                  if (liked.includes(props.photoId)) {
                    dispatch(removeLike(props.photoId));
                  } else {
                    dispatch(addLike(props.photoId));
                  }
                }}
              />
            ) : (
              <HeartIcon
                onClick={() => {
                  if (liked.includes(props.photoId)) {
                    dispatch(removeLike(props.photoId));
                  } else {
                    dispatch(addLike(props.photoId));
                  }
                }}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Photo;

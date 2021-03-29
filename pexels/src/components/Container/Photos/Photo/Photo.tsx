import React, { MouseEvent } from 'react';
import styles from './Photo.module.scss';
import { ReactComponent as DownloadIcon } from '../../../../icons/download.svg';
import { ReactComponent as HeartIcon } from '../../../../icons/heart.svg';
import { ReactComponent as HeartFilledIcon } from '../../../../icons/heart-filled.svg';
import { ReactComponent as AddIcon } from '../../../../icons/add.svg';
import { ReactComponent as AddCircledIcon } from '../../../../icons/check-mark-circled.svg';
import { connect } from 'react-redux';
import {
  addCollectible,
  addLike,
  removeCollectible,
  removeLike,
  showModal,
} from '../../../../redux/actions';
import { RootState } from '../../../../redux/rootReducer';

interface PropTypes {
  photoLink: string;
  photographerURL: string;
  photographerName: string;
  photoId: number;
  photoURL: string;
  isHidden: boolean;
  liked: Array<number>;
  collected: Array<number>;
  showModal: Function;
  addLike: Function;
  removeLike: Function;
  addCollectible: Function;
  removeCollectible: Function;
}

function Photo(props: PropTypes) {
  return (
    <div
      className={styles.photoWrapper}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if (target.dataset?.type === 'photo') {
          props.showModal(props.photoId);
        }
      }}
    >
      <img
        src={props.photoLink}
        alt={'p-card'}
        className={styles.photoImage}
        data-type={'photo'}
      />
      <div className={styles.overlay} data-type={'photo'}>
        <div className={styles.authorLinkWrapper} data-type={'photo'}>
          <a href={props.photographerURL}>{props.photographerName}</a>
        </div>
        <div className={styles.otherLinksWrapper} data-type={'photo'}>
          <a href={`https://www.pexels.com/photo/${props.photoId}/download`}>
            <DownloadIcon />
          </a>
          <span>
            {props.collected.includes(props.photoId) ? (
              <AddCircledIcon
                onClick={() => {
                  if (props.collected.includes(props.photoId)) {
                    props.removeCollectible(props.photoId);
                  } else {
                    props.addCollectible(props.photoId);
                  }
                }}
              />
            ) : (
              <AddIcon
                onClick={() => {
                  if (props.collected.includes(props.photoId)) {
                    props.removeCollectible(props.photoId);
                  } else {
                    props.addCollectible(props.photoId);
                  }
                }}
              />
            )}
          </span>
          <span>
            {props.liked.includes(props.photoId) ? (
              <HeartFilledIcon
                onClick={() => {
                  if (props.liked.includes(props.photoId)) {
                    props.removeLike(props.photoId);
                  } else {
                    props.addLike(props.photoId);
                  }
                }}
              />
            ) : (
              <HeartIcon
                onClick={() => {
                  if (props.liked.includes(props.photoId)) {
                    props.removeLike(props.photoId);
                  } else {
                    props.addLike(props.photoId);
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

function mapStateToProps(state: RootState) {
  return {
    isHidden: state.photosReducer.isHidden,
    liked: state.photosReducer.liked,
    collected: state.photosReducer.collected,
  };
}

const dispatchStateToProps = {
  showModal,
  addLike,
  removeLike,
  addCollectible,
  removeCollectible,
};

export default connect(mapStateToProps, dispatchStateToProps)(Photo);

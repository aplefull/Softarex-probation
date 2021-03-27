import React from 'react';
import styles from './Photo.module.scss';
import { ReactComponent as DownloadIcon } from '../../../../icons/download.svg';
import { ReactComponent as HeartIcon } from '../../../../icons/heart.svg';
import { ReactComponent as HeartFilledIcon } from '../../../../icons/heart-filled.svg';
import { ReactComponent as AddIcon } from '../../../../icons/add.svg';
import { connect } from 'react-redux';
import { addLike, removeLike, showModal } from '../../../../redux/actions';

interface PropTypes {
  photoLink: string;
  photographerURL: string;
  photographerName: string;
  photoId: string;
  isHidden: boolean;
  liked: Array<string>;
  showModal: Function;
  addLike: Function;
  removeLike: Function;
}

function Photo(props: PropTypes) {
  return (
    <div
      className={styles.photoWrapper}
      onClick={(e: any) => {
        if (e.target.dataset?.type === 'photo') {
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
            <AddIcon />
          </span>
          <span>
            {props.liked.includes(props.photoId) ? (
              <HeartFilledIcon
                onClick={(e: any) => {
                  if (props.liked.includes(props.photoId)) {
                    props.removeLike(props.photoId);
                  } else {
                    props.addLike(props.photoId);
                  }
                }}
              />
            ) : (
              <HeartIcon
                onClick={(e: any) => {
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

function mapStateToProps(state: any) {
  return {
    isHidden: state.photosReducer.isHidden,
    liked: state.photosReducer.liked,
  };
}

const dispatchStateToProps = {
  showModal,
  addLike,
  removeLike,
};

export default connect(mapStateToProps, dispatchStateToProps)(Photo);

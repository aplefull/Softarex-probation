import React, { MouseEvent } from 'react';
import { connect } from 'react-redux';
import styles from './Modal.module.scss';
import closeIcon from '../../../../../icons/close.svg';
import { ReactComponent as HeartIcon } from '../../../../../icons/heart.svg';
import { ReactComponent as HeartFilledIcon } from '../../../../../icons/heart-filled.svg';
import { ReactComponent as AddIcon } from '../../../../../icons/add.svg';
import { ReactComponent as AddCircledIcon } from '../../../../../icons/check-mark-circled.svg';
import dropdownIcon from '../../../../../icons/dropdown.svg';
import {
  addCollectible,
  addLike,
  hideModal,
  removeCollectible,
  removeLike,
} from '../../../../../redux/actions';
import Dropdown from './Dropdown/Dropdown';
import { PhotoObjectTypes } from '../../../../../redux/photosReducer';
import { RootState } from '../../../../../redux/rootReducer';

interface PropTypes {
  isHidden: boolean;
  modalID: number;
  photos: PhotoObjectTypes[];
  liked: number[];
  collected: number[];
  hideModal: Function;
  addLike: Function;
  removeLike: Function;
  addCollectible: Function;
  removeCollectible: Function;
}

function Modal(props: PropTypes) {
  if (props.isHidden) document.body.style.overflow = '';
  else document.body.style.overflow = 'hidden';
  let openedPhoto: PhotoObjectTypes | null =
    props?.photos.filter(
      (photo: PhotoObjectTypes) => photo.id === props.modalID
    )[0] || null;

  return (
    <div
      className={`${styles.overlay} ${props.isHidden ? styles.hidden : ''}`}
      data-type={'overlay'}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if (target.dataset?.type === 'overlay') {
          props.hideModal();
        }
      }}
    >
      <div
        className={styles.exitButton}
        onClick={() => {
          props.hideModal();
        }}
      >
        <img src={closeIcon} alt="exit button" />
      </div>
      <div className={styles.contentWrapper}>
        <section className={styles.topBar}>
          <div className={styles.authorSection}>
            <a href={openedPhoto?.photographer_url}>
              {openedPhoto?.photographer}
            </a>
            <button className={styles.whiteButton}>Follow</button>
            <button className={styles.whiteButton}>Donate</button>
          </div>
          <div className={styles.actionsSection}>
            <button
              className={`${styles.whiteButton} ${styles.btnLarge}`}
              onClick={() => {
                if (openedPhoto?.id && props.liked.includes(openedPhoto.id)) {
                  props.removeLike(openedPhoto?.id);
                } else {
                  props.addLike(openedPhoto?.id);
                }
              }}
            >
              {props.liked.includes(openedPhoto?.id) ? (
                <>
                  <HeartFilledIcon /> Liked
                </>
              ) : (
                <>
                  <HeartIcon /> Like
                </>
              )}
            </button>
            <button
              className={`${styles.whiteButton} ${styles.btnLarge}`}
              onClick={() => {
                if (
                  openedPhoto?.id &&
                  props.collected.includes(openedPhoto?.id)
                ) {
                  props.removeCollectible(openedPhoto?.id);
                } else {
                  props.addCollectible(openedPhoto?.id);
                }
              }}
            >
              {props.collected.includes(openedPhoto?.id) ? (
                <>
                  <AddCircledIcon /> Collected
                </>
              ) : (
                <>
                  <AddIcon /> Collect
                </>
              )}
            </button>
            <div className={styles.downloadButtonWrapper}>
              <a
                href={`https://pexels.com/photo/${openedPhoto?.id}/download`}
                className={styles.downloadButton}
              >
                Free Download
              </a>
              <div className={styles.dropdownButtonWrapper}>
                <img src={dropdownIcon} alt="" />
              </div>
              <Dropdown photo={openedPhoto} />
            </div>
          </div>
        </section>
        <img src={openedPhoto?.src.original} alt="" />
      </div>
    </div>
  );
}

function mapStateToProps(state: RootState) {
  return {
    modalID: state.photosReducer.modalID,
    photos: state.photosReducer.photos,
    liked: state.photosReducer.liked,
    collected: state.photosReducer.collected,
  };
}

const mapDispatchToProps = {
  hideModal,
  addLike,
  removeLike,
  addCollectible,
  removeCollectible,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

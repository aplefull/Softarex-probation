import React from 'react';
import { connect } from 'react-redux';
import styles from './Modal.module.scss';
import closeIcon from '../../../../../icons/close.svg';
import { ReactComponent as HeartIcon } from '../../../../../icons/heart.svg';
import { ReactComponent as HeartFilledIcon } from '../../../../../icons/heart-filled.svg';
import { ReactComponent as AddIcon } from '../../../../../icons/add.svg';
import dropdownIcon from '../../../../../icons/dropdown.svg';
import { addLike, hideModal, removeLike } from '../../../../../redux/actions';
import Dropdown from './Dropdown/Dropdown';

interface PropTypes {
  isHidden: boolean;
  modalID: number;
  photos: Array<any>;
  liked: Array<string>;
  hideModal: Function;
  addLike: Function;
  removeLike: Function;
}

function Modal(props: PropTypes) {
  if (props.isHidden) document.body.style.overflow = '';
  else document.body.style.overflow = 'hidden';

  let openedPhoto: any =
    props?.photos.filter((photo: any) => photo.id === props.modalID)[0] || null;

  return (
    <div
      className={`${styles.overlay} ${props.isHidden ? styles.hidden : ''}`}
      data-type={'overlay'}
      onClick={(e: any) => {
        if (e.target.dataset?.type === 'overlay') {
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
              onClick={(e: any) => {
                if (props.liked.includes(openedPhoto?.id)) {
                  props.removeLike(openedPhoto?.id);
                } else {
                  props.addLike(openedPhoto?.id);
                }
              }}
            >
              {props.liked.includes(openedPhoto?.id) ? (
                <HeartFilledIcon />
              ) : (
                <HeartIcon />
              )}
              Like
            </button>
            <button className={`${styles.whiteButton} ${styles.btnLarge}`}>
              <AddIcon /> Collect
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

function mapStateToProps(state: any) {
  return {
    modalID: state.photosReducer.modalID,
    photos: state.photosReducer.photos,
    liked: state.photosReducer.liked,
  };
}

const mapDispatchToProps = {
  hideModal,
  addLike,
  removeLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

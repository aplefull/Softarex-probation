import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../css/components/Modal.module.scss';
import closeIcon from '../assets/icons/close.svg';
import { ReactComponent as HeartIcon } from '../assets/icons/heart.svg';
import { ReactComponent as HeartFilledIcon } from '../assets/icons/heart-filled.svg';
import { ReactComponent as AddIcon } from '../assets/icons/add.svg';
import { ReactComponent as AddCircledIcon } from '../assets/icons/check-mark-circled.svg';
import dropdownIcon from '../assets/icons/dropdown.svg';
import { addCollectible, addLike, removeCollectible, removeLike } from '../redux/photosSlice';
import Dropdown from './Dropdown';
import { PhotoObjectTypes } from '../redux/photosSlice';
import { RootState } from '../redux/store';

interface PropTypes {
  isOpen: boolean;
  photoId: number | null;
  handleCloseModal: React.MouseEventHandler;
}

function Modal(props: PropTypes) {
  const dispatch = useDispatch();
  const { liked, collected, photos } = useSelector((state: RootState) => state.photos);
  let openedPhoto: PhotoObjectTypes | null =
    photos.filter((photo: PhotoObjectTypes) => photo.id === props.photoId)[0] || null;

  useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [props.isOpen]);

  return props.isOpen ? (
    <div className={`${styles.overlay}`} onClick={props.handleCloseModal}>
      <div className={styles.exitButton} onClick={props.handleCloseModal}>
        <img src={closeIcon} alt="exit button" />
      </div>
      <div
        className={styles.contentWrapper}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <section className={styles.topBar}>
          <div className={styles.authorSection}>
            <a href={openedPhoto?.photographer_url}>{openedPhoto?.photographer}</a>
            <button className={styles.whiteButton}>Follow</button>
            <button className={styles.whiteButton}>Donate</button>
          </div>
          <div className={styles.actionsSection}>
            <div className={styles.btnWrapper}>
              <button
                className={`${styles.whiteButton} ${styles.btnLarge}`}
                onClick={() => {
                  if (openedPhoto?.id && liked.includes(openedPhoto.id)) {
                    dispatch(removeLike(openedPhoto?.id));
                  } else {
                    dispatch(addLike(openedPhoto?.id));
                  }
                }}
              >
                {liked.includes(openedPhoto?.id) ? (
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
                  if (openedPhoto?.id && collected.includes(openedPhoto?.id)) {
                    dispatch(removeCollectible(openedPhoto?.id));
                  } else {
                    dispatch(addCollectible(openedPhoto?.id));
                  }
                }}
              >
                {collected.includes(openedPhoto?.id) ? (
                  <>
                    <AddCircledIcon /> Collected
                  </>
                ) : (
                  <>
                    <AddIcon /> Collect
                  </>
                )}
              </button>
            </div>
            <div className={styles.downloadButtonWrapper}>
              <a href={`https://pexels.com/photo/${openedPhoto?.id}/download`} className={styles.downloadButton}>
                Free Download
              </a>
              <div className={styles.dropdownButtonWrapper}>
                <img src={dropdownIcon} alt="" />
              </div>
              <Dropdown photo={openedPhoto} />
            </div>
          </div>
        </section>
        <img src={`${openedPhoto?.src.original}?auto=compress&cs=tinysrgb&dpr=1&w=800`} alt="" />
      </div>
    </div>
  ) : null;
}

export default Modal;

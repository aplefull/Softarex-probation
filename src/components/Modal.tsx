import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addCollectible, addLike, removeCollectible, removeLike } from '../redux/photosSlice';
import { PhotoObjectTypes } from '../redux/photosSlice';
import cx from 'classnames';
import closeIcon from '../assets/icons/close.svg';
import dropdownIcon from '../assets/icons/dropdown.svg';
import { ReactComponent as AddIcon } from '../assets/icons/add.svg';
import { ReactComponent as HeartIcon } from '../assets/icons/heart.svg';
import { ReactComponent as HeartFilledIcon } from '../assets/icons/heart-filled.svg';
import { ReactComponent as AddCircledIcon } from '../assets/icons/check-mark-circled.svg';
import styles from '../css/components/Modal.module.scss';
import Dropdown from './Dropdown';

type ModalProps = {
  isOpen: boolean;
  photo: PhotoObjectTypes | null;
  handleCloseModal: () => void;
};

function Modal({ handleCloseModal, isOpen, photo }: ModalProps) {
  const dispatch = useDispatch();
  const { liked, collected } = useSelector((state: RootState) => state.photos);

  const handleCollectClick = useCallback(() => {
    if (photo?.id && collected.includes(photo?.id)) {
      dispatch(removeCollectible(photo?.id));
    } else {
      dispatch(addCollectible(photo?.id));
    }
  }, [collected, dispatch, photo]);

  const handleLikeClick = useCallback(() => {
    if (photo?.id && liked.includes(photo.id)) {
      dispatch(removeLike(photo?.id));
    } else {
      dispatch(addLike(photo?.id));
    }
  }, [liked, dispatch, photo]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return isOpen ? (
    <div className={`${styles.overlay}`} onClick={handleCloseModal}>
      <div className={styles.exitButton} onClick={handleCloseModal}>
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
            <a href={photo?.photographer_url}>{photo?.photographer}</a>
            <button className={styles.whiteButton}>Follow</button>
            <button className={styles.whiteButton}>Donate</button>
          </div>
          <div className={styles.actionsSection}>
            <div className={styles.btnWrapper}>
              <button className={cx(styles.whiteButton, styles.btnLarge)} onClick={handleLikeClick}>
                {photo && liked.includes(photo.id) ? (
                  <>
                    <HeartFilledIcon /> Liked
                  </>
                ) : (
                  <>
                    <HeartIcon /> Like
                  </>
                )}
              </button>
              <button className={cx(styles.whiteButton, styles.btnLarge)} onClick={handleCollectClick}>
                {photo && collected.includes(photo.id) ? (
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
              <a href={`https://pexels.com/photo/${photo?.id}/download`} className={styles.downloadButton}>
                Free Download
              </a>
              <div className={styles.dropdownButtonWrapper}>
                <img src={dropdownIcon} alt="" />
              </div>
              <Dropdown photo={photo} />
            </div>
          </div>
        </section>
        <img src={`${photo?.src.original}?auto=compress&cs=tinysrgb&dpr=1&w=800`} alt="" />
      </div>
    </div>
  ) : null;
}

export default Modal;

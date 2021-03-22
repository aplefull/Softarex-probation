import React, { MouseEventHandler } from 'react';
import { connect } from 'react-redux';
import styles from './Modal.module.scss';
import closeIcon from '../../../../../icons/close.svg';
import heartIcon from '../../../../../icons/heart.svg';
import addIcon from '../../../../../icons/add.svg';
import dropdownIcon from '../../../../../icons/dropdown.svg';
import { hideModal } from '../../../../../redux/actions';
import Dropdown from './Dropdown/Dropdown';

interface PropTypes {
  isHidden: boolean;
  modalID: number;
  photos: Array<any>;
  hideModal: MouseEventHandler<HTMLDivElement>;
}

function Modal(props: PropTypes) {
  if (props.isHidden) document.body.style.overflow = '';
  else document.body.style.overflow = 'hidden';

  let openedPhoto: any =
    props?.photos.filter((photo: any) => photo.id === props.modalID)[0] || null;

  return (
    <div className={`${styles.overlay} ${props.isHidden ? styles.hidden : ''}`}>
      <div className={styles.exitButton} onClick={props.hideModal}>
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
            <button className={`${styles.whiteButton} ${styles.btnLarge}`}>
              <img src={heartIcon} alt="" /> Like
            </button>
            <button className={`${styles.whiteButton} ${styles.btnLarge}`}>
              <img src={addIcon} alt="" /> Collect
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
  };
}

const mapDispatchToProps = {
  hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

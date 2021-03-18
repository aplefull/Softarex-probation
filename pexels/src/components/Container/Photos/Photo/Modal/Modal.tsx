import React, { MouseEventHandler } from 'react';
import { connect } from 'react-redux';
import styles from './Modal.module.scss';
import closeIcon from '../../../../../icons/close.svg';
import heartIcon from '../../../../../icons/heart.svg';
import addIcon from '../../../../../icons/add.svg';
import { hideModal } from '../../../../../redux/actions';

interface propTypes {
  isHidden: boolean;
  modalID: number;
  photos: Array<any>;
  hideModal: MouseEventHandler<HTMLDivElement>;
}

function Modal(props: propTypes) {
  if (props.isHidden) document.body.style.overflow = '';
  else document.body.style.overflow = 'hidden';

  let openedPhoto: any = props?.photos.filter(
    (photo: any) => photo.id === props.modalID
  )[0];

  console.log(openedPhoto);

  return (
    <div className={`${styles.overlay} ${props.isHidden ? styles.hidden : ''}`}>
      <div className={styles.exitButton} onClick={props.hideModal}>
        <img src={closeIcon} alt="exit button" />
      </div>
      <div className={styles.contentWrapper}>
        <section className={styles.topBar}>
          <div className={styles.authorSection}>
            <a href={openedPhoto?.photographer_url}>{openedPhoto?.photographer}</a>
            <button className={styles.whiteButton}>Follow</button>
            <button className={styles.whiteButton}>Donate</button>
          </div>
          <div className={styles.actionsSection}>
            <button className={`${styles.whiteButton} ${styles.btnLarge}`}><img src={heartIcon} alt=""/> Like</button>
            <button className={`${styles.whiteButton} ${styles.btnLarge}`}><img src={addIcon} alt=""/> Collect</button>
            <div>
              <button></button>
              <div>
                <div><img src="" alt=""/></div>
                <div></div>
              </div>
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

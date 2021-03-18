import React, { MouseEventHandler } from 'react';
import styles from './Photo.module.scss';
import downloadIcon from '../../../../icons/download.svg';
import heartIcon from '../../../../icons/heart.svg';
import addIcon from '../../../../icons/add.svg';
import { connect } from 'react-redux';
import { showModal } from '../../../../redux/actions';

interface propTypes {
  photoLink: string;
  photographerURL: string;
  photographerName: string;
  photoId: string;
  isHidden: boolean;
  showModal: Function;
}

function Photo(props: propTypes) {
  return (
    <div
      className={styles.photoWrapper}
      onClick={(e) => {
        props.showModal(props.photoId);
      }}
    >
      <img src={props.photoLink} alt={'p-card'} className={styles.photoImage} />
      <div className={styles.overlay}>
        <div className={styles.authorLinkWrapper}>
          <a href={props.photographerURL}>{props.photographerName}</a>
        </div>
        <div className={styles.otherLinksWrapper}>
          <a href={`https://www.pexels.com/photo/${props.photoId}/download`}>
            <img src={downloadIcon} alt={'download icon'} />
          </a>
          <a href="">
            <img src={addIcon} alt={'add icon'} />
          </a>
          <a href="">
            <img src={heartIcon} alt={'heart icon'} />
          </a>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state: any) {
  return {
    isHidden: state.photosReducer.isHidden,
  };
}

const dispatchStateToProps = {
  showModal,
};

export default connect(mapStateToProps, dispatchStateToProps)(Photo);

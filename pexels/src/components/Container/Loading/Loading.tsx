import React from 'react';
import styles from './Loading.module.scss';

interface propTypes {
  isHidden: boolean;
}

function Loading(props: propTypes) {
  return (
    <div
      className={`${styles.loadingWrapper} ${
        props.isHidden ? styles.hidden : ''
      }`}
    >
      <div className={styles.animationDot} />
      <div className={styles.animationDot} />
      <div className={styles.animationDot} />
      <div className={styles.animationDot} />
    </div>
  );
}

export default Loading;

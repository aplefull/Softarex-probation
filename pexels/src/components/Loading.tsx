import React from 'react';
import styles from '../css/components/Loading.module.scss';

function Loading({ isLoading }: { isLoading: boolean }) {
  return (
    <div className={`${styles.loadingWrapper} ${isLoading ? '' : styles.hidden}`}>
      <div className={styles.animationDot} />
      <div className={styles.animationDot} />
      <div className={styles.animationDot} />
      <div className={styles.animationDot} />
    </div>
  );
}

export default Loading;

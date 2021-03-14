import React from 'react';
import styles from './Loading.module.scss';
import { useSelector } from 'react-redux';
import {RootState} from "../../../redux/rootReducer";

function Loading() {
  const loading: boolean = useSelector(
    (state: RootState) => state.photosReducer.isLoading
  );

  return (
    <div className={`${styles.loadingWrapper} ${loading ? '' : styles.hidden}`}>
      <div className={styles.animationDot} />
      <div className={styles.animationDot} />
      <div className={styles.animationDot} />
      <div className={styles.animationDot} />
    </div>
  );
}

export default Loading;

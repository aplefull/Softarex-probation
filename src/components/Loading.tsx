import React, { useMemo } from 'react';
import styles from '../css/components/Loading.module.scss';
import classNames from 'classnames';

function Loading({ isLoading }: { isLoading: boolean }) {
  const wrapperClassName = useMemo(() => {
    return classNames(styles.loadingWrapper, {
      [styles.hidden]: !isLoading,
    });
  }, [isLoading]);

  return (
    <div className={wrapperClassName}>
      <div className={styles.animationDot} />
      <div className={styles.animationDot} />
      <div className={styles.animationDot} />
      <div className={styles.animationDot} />
    </div>
  );
}

export default Loading;

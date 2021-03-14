import React from 'react';
import styles from './Container.module.scss';
import Title from './Title/Title';
import Photos from './Photos/Photos';
import Loading from './Loading/Loading';

function Container() {

  return (
    <div className={styles.container}>
      <Title />
      <Photos />
      <Loading />
    </div>
  );
}

export default Container;

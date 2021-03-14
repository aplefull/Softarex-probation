import React from 'react';
import styles from './Tab.module.scss';

interface propTypes {
  text: string;
  isSelected: boolean;
  url: string;
}

function Tab(props: propTypes) {
  return (
    <a
      href={props.url}
      className={`${styles.tab} ${props.isSelected ? styles.active : ''}`}
    >
      <p>{props.text}</p>
      <div className={styles.underline}/>
    </a>
  );
}

export default Tab;

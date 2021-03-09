import React from 'react';
import styles from './Tab.module.scss';

interface TabText {
  text: string;
  isSelected: boolean;
}

function Tab(props: TabText) {
  return (
    <a
      href="https://aplefull.art"
      className={`${styles.tab} ${props.isSelected ? styles.active : ''}`}
    >
      <p>{props.text}</p>
      <div className={styles.underline}></div>
    </a>
  );
}

export default Tab;

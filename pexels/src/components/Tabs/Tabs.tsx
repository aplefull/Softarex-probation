import Tab from './Tab/Tab';
import React from 'react';
import styles from './Tabs.module.scss';

function Tabs() {
  return (
    <div className={styles.tabsWrapper}>
      <Tab text={'Home'} isSelected={true} />
      <Tab text={'Discover'} isSelected={false} />
      <Tab text={'Videos'} isSelected={false} />
      <Tab text={'Leaderboard'} isSelected={false} />
      <Tab text={'Challenges'} isSelected={false} />
    </div>
  );
}

export default Tabs;

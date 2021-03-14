import Tab from './Tab/Tab';
import React from 'react';
import styles from './Tabs.module.scss';

function Tabs() {
  return (
    <div className={styles.tabsWrapper}>
      <Tab url={'https://pexels.com/home'} text={'Home'} isSelected={true} />
      <Tab url={'https://pexels.com/discover'} text={'Discover'} isSelected={false} />
      <Tab url={'https://pexels.com/videos'} text={'Videos'} isSelected={false} />
      <Tab url={'https://pexels.com/leaderboard'} text={'Leaderboard'} isSelected={false} />
      <Tab url={'https://pexels.com/challenges'} text={'Challenges'} isSelected={false} />
    </div>
  );
}

export default Tabs;

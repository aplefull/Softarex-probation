import Tab from './Tab';
import styles from '../css/components/Tabs.module.scss';

function Tabs() {
  return (
    <div className={styles.tabsWrapper}>
      <div className={styles.innerWrapper}>
        <Tab url={'https://pexels.com/home'} text={'Home'} isSelected={true} />
        <Tab url={'https://pexels.com/discover'} text={'Discover'} isSelected={false} />
        <Tab url={'https://pexels.com/videos'} text={'Videos'} isSelected={false} />
        <Tab url={'https://pexels.com/leaderboard'} text={'Leaderboard'} isSelected={false} />
        <Tab url={'https://pexels.com/challenges'} text={'Challenges'} isSelected={false} />
      </div>
    </div>
  );
}

export default Tabs;

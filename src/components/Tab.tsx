import styles from '../css/components/Tab.module.scss';
import cx from 'classnames';

type PropTypes = {
  text: string;
  isSelected: boolean;
  url: string;
};

function Tab({ url, text, isSelected }: PropTypes) {
  return (
    <a href={url} className={cx(styles.tab, { [styles.active]: isSelected })}>
      <p>{text}</p>
      <div className={styles.underline} />
    </a>
  );
}

export default Tab;

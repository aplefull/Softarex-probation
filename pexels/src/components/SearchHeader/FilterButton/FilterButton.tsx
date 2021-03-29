import React from 'react';
import styles from './FilterButton.module.scss';
import { ReactComponent as OrientationIcon } from '../../../icons/orientation.svg';
import { ReactComponent as SizeIcon } from '../../../icons/size.svg';
import { ReactComponent as ColorIcon } from '../../../icons/color.svg';
import { ReactComponent as LandscapeIcon } from '../../../icons/vertical.svg';
import { ReactComponent as PortraitIcon } from '../../../icons/horizontal.svg';
import { ReactComponent as SquareIcon } from '../../../icons/square.svg';
import { ReactComponent as CheckmarkIcon } from '../../../icons/checkmark.svg';
import { ReactComponent as LargeIcon } from '../../../icons/large.svg';
import { ReactComponent as MediumIcon } from '../../../icons/medium.svg';
import { ReactComponent as SmallIcon } from '../../../icons/small.svg';

interface PropTypes {
  caption: string;
}

function renderIcon(str: string) {
  switch (str) {
    case 'Orientation':
      return <OrientationIcon className={styles.svgIcon} />;
    case 'Size':
      return <SizeIcon className={styles.svgIcon} />;
    case 'Color':
      return <ColorIcon className={styles.svgIcon} />;

    default:
      return null;
  }
}

function renderDropdown(str: string) {
  switch (str) {
    case 'Orientation':
      return (
        <div className={`${styles.dropdownWrapper} ${styles.orientation}`}>
          <ul>
            <li>
              <p>All orientations</p>
              <CheckmarkIcon className={styles.checkmark} />
            </li>
            <li>
              <PortraitIcon className={styles.svgIcon} />
              <p>Horizontal</p>
              <CheckmarkIcon className={styles.checkmark} />
            </li>
            <li>
              <LandscapeIcon className={styles.svgIcon} />
              <p>Vertical</p>
              <CheckmarkIcon className={styles.checkmark} />
            </li>
            <li>
              <SquareIcon className={styles.svgIcon} />
              <p>Square</p>
              <CheckmarkIcon className={styles.checkmark} />
            </li>
          </ul>
        </div>
      );
    case 'Size':
      return (
        <div className={`${styles.dropdownWrapper} ${styles.size}`}>
          <ul>
            <li>
              <p>All Sizes</p>
              <CheckmarkIcon className={styles.checkmark} />
            </li>
            <li>
              <LargeIcon className={styles.svgIcon} />
              <p>Large</p>
              <CheckmarkIcon className={styles.checkmark} />
            </li>
            <li>
              <MediumIcon className={styles.svgIcon} />
              <p>Medium</p>
              <CheckmarkIcon className={styles.checkmark} />
            </li>
            <li>
              <SmallIcon className={styles.svgIcon} />
              <p>Small</p>
              <CheckmarkIcon className={styles.checkmark} />
            </li>
          </ul>
        </div>
      );
    case 'Color':
      return (
        <div className={`${styles.dropdownWrapper} ${styles.color}`}>
          <ul>
            <li>
              <p>All colors</p>
              <CheckmarkIcon className={styles.checkmark} />
            </li>
            <li>
              <div className={styles.inputWrapper}>
                <div className={styles.colorSwatchWrapper}>
                  <span className={styles.colorSwatch} />
                  <p>#</p>
                </div>
                <input
                  type="text"
                  className={styles.colorInput}
                  placeholder={'Enter hex or select color'}
                />
              </div>
            </li>
            <li>
              <div className={styles.colorOptions}>
                <div className={`${styles.colorOption} ${styles.red}`} />
                <div className={`${styles.colorOption} ${styles.pink}`} />
                <div className={`${styles.colorOption} ${styles.violet}`} />
                <div className={`${styles.colorOption} ${styles.blue}`} />
                <div className={`${styles.colorOption} ${styles.turquoise}`} />
                <div className={`${styles.colorOption} ${styles.green}`} />
                <div className={`${styles.colorOption} ${styles.yellow}`} />
                <div className={`${styles.colorOption} ${styles.brown}`} />
                <div className={`${styles.colorOption} ${styles.white}`} />
                <div className={`${styles.colorOption} ${styles.black}`} />
              </div>
            </li>
          </ul>
        </div>
      );

    default:
      return null;
  }
}

function FilterButton(props: PropTypes) {
  return (
    <>
      <div className={styles.tab}>
        {renderIcon(props.caption)}
        <p>{props.caption}</p>
      </div>
      {renderDropdown(props.caption)}
    </>
  );
}

export default FilterButton;

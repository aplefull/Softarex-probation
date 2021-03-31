import React, { ChangeEvent, MouseEvent } from 'react';
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
import { connect } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import {
  changeColorFilter,
  changeOrientationFilter,
  changeSizeFilter,
} from '../../../redux/actions';

interface PropTypes {
  caption: string;
  orientation: string;
  size: string;
  color: string;
  changeSizeFilter: Function;
  changeOrientationFilter: Function;
  changeColorFilter: Function;
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

function FilterButton(props: PropTypes) {
  function renderDropdown(str: string) {
    switch (str) {
      case 'Orientation':
        return (
          <div className={`${styles.dropdownWrapper} ${styles.orientation}`}>
            <ul>
              <li
                data-value={'all'}
                onClick={handleOrientationClick}
                className={props.orientation === 'all' ? styles.selected : ''}
              >
                <p>All orientations</p>
                <CheckmarkIcon className={styles.checkmark} />
              </li>
              <li
                data-value={'horizontal'}
                onClick={handleOrientationClick}
                className={
                  props.orientation === 'horizontal' ? styles.selected : ''
                }
              >
                <PortraitIcon className={styles.svgIcon} />
                <p>Horizontal</p>
                <CheckmarkIcon className={styles.checkmark} />
              </li>
              <li
                data-value={'vertical'}
                onClick={handleOrientationClick}
                className={
                  props.orientation === 'vertical' ? styles.selected : ''
                }
              >
                <LandscapeIcon className={styles.svgIcon} />
                <p>Vertical</p>
                <CheckmarkIcon className={styles.checkmark} />
              </li>
              <li
                data-value={'square'}
                onClick={handleOrientationClick}
                className={
                  props.orientation === 'square' ? styles.selected : ''
                }
              >
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
              <li
                data-value={'all'}
                onClick={handleSizeClick}
                className={props.size === 'all' ? styles.selected : ''}
              >
                <p>All Sizes</p>
                <CheckmarkIcon className={`${styles.checkmark}`} />
              </li>
              <li
                data-value={'large'}
                onClick={handleSizeClick}
                className={props.size === 'large' ? styles.selected : ''}
              >
                <LargeIcon className={styles.svgIcon} />
                <p>Large</p>
                <CheckmarkIcon className={`${styles.checkmark}`} />
              </li>
              <li
                data-value={'medium'}
                onClick={handleSizeClick}
                className={props.size === 'medium' ? styles.selected : ''}
              >
                <MediumIcon className={styles.svgIcon} />
                <p>Medium</p>
                <CheckmarkIcon className={`${styles.checkmark}`} />
              </li>
              <li
                data-value={'small'}
                onClick={handleSizeClick}
                className={props.size === 'small' ? styles.selected : ''}
              >
                <SmallIcon className={styles.svgIcon} />
                <p>Small</p>
                <CheckmarkIcon className={`${styles.checkmark}`} />
              </li>
            </ul>
          </div>
        );
      case 'Color':
        return (
          <div className={`${styles.dropdownWrapper} ${styles.color}`}>
            <ul>
              <li
                className={props.color === 'all' ? styles.selected : ''}
                data-value={'all'}
                onClick={handleColorClick}
              >
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
                    className={`${styles.colorInput}`}
                    placeholder={'Enter hex or select color'}
                    onChange={handleColorInputChange}
                  />
                </div>
              </li>
              <li>
                <div className={styles.colorOptions} onClick={handleColorClick}>
                  <div
                    className={`${styles.colorOption} ${styles.red} ${
                      props.color === 'red' ? styles.selectedColor : ''
                    }`}
                    data-value={'red'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.pink} ${
                      props.color === 'pink' ? styles.selectedColor : ''
                    }`}
                    data-value={'pink'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.violet} ${
                      props.color === 'violet' ? styles.selectedColor : ''
                    }`}
                    data-value={'violet'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.blue} ${
                      props.color === 'blue' ? styles.selectedColor : ''
                    }`}
                    data-value={'blue'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.turquoise} ${
                      props.color === 'turquoise' ? styles.selectedColor : ''
                    }`}
                    data-value={'turquoise'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.green} ${
                      props.color === 'green' ? styles.selectedColor : ''
                    }`}
                    data-value={'green'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.yellow} ${
                      props.color === 'yellow' ? styles.selectedColor : ''
                    }`}
                    data-value={'yellow'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.brown} ${
                      props.color === 'brown' ? styles.selectedColor : ''
                    }`}
                    data-value={'brown'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.white} ${
                      props.color === 'white' ? styles.selectedColor : ''
                    }`}
                    data-value={'white'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.black} ${
                      props.color === 'black' ? styles.selectedColor : ''
                    }`}
                    data-value={'black'}
                  >
                    <CheckmarkIcon />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        );

      default:
        return null;
    }
  }

  function handleOrientationClick(e: MouseEvent<HTMLLIElement>) {
    props.changeOrientationFilter(e.currentTarget.dataset.value);
  }

  function handleSizeClick(e: MouseEvent<HTMLLIElement>) {
    props.changeSizeFilter(e.currentTarget.dataset.value);
  }

  function handleColorClick(e: MouseEvent<HTMLDivElement | HTMLLIElement>) {
    const target = e.target as HTMLElement;

    if (target.dataset.value !== undefined) {
      props.changeColorFilter(target.dataset.value);
    }
  }

  function handleColorInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(e.target.value)) {
      e.target.dataset.value = e.target.value;
      props.changeColorFilter(e.target.value);
    }
  }

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

function mapStateToProps(state: RootState) {
  return {
    orientation: state.filterReducer.orientation,
    size: state.filterReducer.size,
    color: state.filterReducer.color,
  };
}

const mapDispatchToProps = {
  changeSizeFilter,
  changeOrientationFilter,
  changeColorFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterButton);

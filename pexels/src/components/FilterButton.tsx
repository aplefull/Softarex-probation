import React, { ChangeEvent, MouseEvent } from 'react';
import styles from '../css/components/FilterButton.module.scss';
import { ReactComponent as OrientationIcon } from '../assets/icons/orientation.svg';
import { ReactComponent as SizeIcon } from '../assets/icons/size.svg';
import { ReactComponent as ColorIcon } from '../assets/icons/color.svg';
import { ReactComponent as LandscapeIcon } from '../assets/icons/vertical.svg';
import { ReactComponent as PortraitIcon } from '../assets/icons/horizontal.svg';
import { ReactComponent as SquareIcon } from '../assets/icons/square.svg';
import { ReactComponent as CheckmarkIcon } from '../assets/icons/checkmark.svg';
import { ReactComponent as LargeIcon } from '../assets/icons/large.svg';
import { ReactComponent as MediumIcon } from '../assets/icons/medium.svg';
import { ReactComponent as SmallIcon } from '../assets/icons/small.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { changeColorFilter, changeOrientationFilter, changeSizeFilter } from '../redux/filtersSlice';

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

function FilterButton(props: PropTypes) {
  const dispatch = useDispatch();
  const { orientation, size, color } = useSelector((state: RootState) => state.filters);

  function renderDropdown(str: string) {
    switch (str) {
      case 'Orientation':
        return (
          <div className={`${styles.dropdownWrapper} ${styles.orientation}`}>
            <ul>
              <li
                data-value={'all'}
                onClick={handleOrientationClick}
                className={orientation === 'all' ? styles.selected : ''}
              >
                <p>All orientations</p>
                <CheckmarkIcon className={styles.checkmark} />
              </li>
              <li
                data-value={'horizontal'}
                onClick={handleOrientationClick}
                className={orientation === 'horizontal' ? styles.selected : ''}
              >
                <PortraitIcon className={styles.svgIcon} />
                <p>Horizontal</p>
                <CheckmarkIcon className={styles.checkmark} />
              </li>
              <li
                data-value={'vertical'}
                onClick={handleOrientationClick}
                className={orientation === 'vertical' ? styles.selected : ''}
              >
                <LandscapeIcon className={styles.svgIcon} />
                <p>Vertical</p>
                <CheckmarkIcon className={styles.checkmark} />
              </li>
              <li
                data-value={'square'}
                onClick={handleOrientationClick}
                className={orientation === 'square' ? styles.selected : ''}
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
              <li data-value={'all'} onClick={handleSizeClick} className={size === 'all' ? styles.selected : ''}>
                <p>All Sizes</p>
                <CheckmarkIcon className={`${styles.checkmark}`} />
              </li>
              <li data-value={'large'} onClick={handleSizeClick} className={size === 'large' ? styles.selected : ''}>
                <LargeIcon className={styles.svgIcon} />
                <p>Large</p>
                <CheckmarkIcon className={`${styles.checkmark}`} />
              </li>
              <li data-value={'medium'} onClick={handleSizeClick} className={size === 'medium' ? styles.selected : ''}>
                <MediumIcon className={styles.svgIcon} />
                <p>Medium</p>
                <CheckmarkIcon className={`${styles.checkmark}`} />
              </li>
              <li data-value={'small'} onClick={handleSizeClick} className={size === 'small' ? styles.selected : ''}>
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
              <li className={color === 'all' ? styles.selected : ''} data-value={'all'} onClick={handleColorClick}>
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
                    className={`${styles.colorOption} ${styles.red} ${color === 'red' ? styles.selectedColor : ''}`}
                    data-value={'red'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.pink} ${color === 'pink' ? styles.selectedColor : ''}`}
                    data-value={'pink'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.violet} ${
                      color === 'violet' ? styles.selectedColor : ''
                    }`}
                    data-value={'violet'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.blue} ${color === 'blue' ? styles.selectedColor : ''}`}
                    data-value={'blue'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.turquoise} ${
                      color === 'turquoise' ? styles.selectedColor : ''
                    }`}
                    data-value={'turquoise'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.green} ${color === 'green' ? styles.selectedColor : ''}`}
                    data-value={'green'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.yellow} ${
                      color === 'yellow' ? styles.selectedColor : ''
                    }`}
                    data-value={'yellow'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.brown} ${color === 'brown' ? styles.selectedColor : ''}`}
                    data-value={'brown'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.white} ${color === 'white' ? styles.selectedColor : ''}`}
                    data-value={'white'}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`${styles.colorOption} ${styles.black} ${color === 'black' ? styles.selectedColor : ''}`}
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
    dispatch(changeOrientationFilter(e.currentTarget.dataset.value));
  }

  function handleSizeClick(e: MouseEvent<HTMLLIElement>) {
    dispatch(changeSizeFilter(e.currentTarget.dataset.value));
  }

  function handleColorClick(e: MouseEvent<HTMLDivElement | HTMLLIElement>) {
    const target = e.target as HTMLElement;

    if (target.dataset.value !== undefined) {
      dispatch(changeColorFilter(target.dataset.value));
    }
  }

  function handleColorInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(e.target.value)) {
      e.target.dataset.value = e.target.value;
      dispatch(changeColorFilter(e.target.value));
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

export default FilterButton;

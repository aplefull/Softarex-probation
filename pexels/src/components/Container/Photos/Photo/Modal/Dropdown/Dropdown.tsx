import React from 'react';
import styles from './Dropdown.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeSizeOption } from '../../../../../../redux/actions';

interface PropTypes {
  photo: any;
}

function Dropdown(props: PropTypes) {
  let sizeOptions: any = [];
  let selectedOption = useSelector(
    (state: any) => state.dropdownReducer.selectedOption
  );
  let dispatch = useDispatch();

  if (props.photo?.src !== undefined) {
    sizeOptions = Object.entries(props.photo.src).filter((el: any) => {
      return ['original', 'large', 'medium', 'small'].some(
        (val: string) => val === el[0]
      );
    });
  }
  return (
    <div className={styles.dropdownWrapper}>
      <p className={styles.text}>Choose a size:</p>
      <form
        onChange={(e: any) => {
          dispatch(changeSizeOption(e.target.getAttribute('data-size')));
        }}
      >
        <ul>
          {sizeOptions.map((el: any, index: number) => {
            return (
              <li key={index} className={`${selectedOption === el[0] ? styles.selected : ''}`}>
                <label>
                  <input type={'radio'} name={'size'} data-size={el[0]} defaultChecked={selectedOption === el[0]}/>
                  <p>{el[0]}</p>
                </label>
              </li>
            );
          })}
        </ul>
      </form>
      <button
        className={styles.downloadButton}
        onClick={async () => {
          const res = await fetch(props.photo.src[selectedOption]);
          const blob = await res.blob();
          const blobURL = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = blobURL;
          a.setAttribute(
            'download',
            `pexels-${props.photo.photographer.replace(/\s/g, '-')}-${
              props.photo.id
            }.jpg`
          );
          a.click();
          URL.revokeObjectURL(blobURL);
        }}
      >
        Free Download
      </button>
    </div>
  );
}

export default Dropdown;

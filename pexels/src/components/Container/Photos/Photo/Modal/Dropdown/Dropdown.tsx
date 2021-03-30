import React, { FormEvent } from 'react';
import styles from './Dropdown.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeSizeOption } from '../../../../../../redux/actions';
import { PhotoObjectTypes } from '../../../../../../redux/photosReducer';
import { RootState } from '../../../../../../redux/rootReducer';

interface PropTypes {
  photo: PhotoObjectTypes | null;
}

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}

function Dropdown(props: PropTypes) {
  let sizeOptions: string[][] = [];
  let selectedOption: string = useSelector(
    (state: RootState) => state.dropdownReducer.selectedOption
  );
  let dispatch = useDispatch();

  if (props.photo?.src !== undefined) {
    sizeOptions = Object.entries(props.photo.src).filter((el: string[]) => {
      return ['original', 'large', 'medium', 'small'].some(
        (val: string) => val === el[0]
      );
    });
  }

  return (
    <div className={styles.dropdownWrapper}>
      <p className={styles.text}>Choose a size:</p>
      <form
        onChange={(e: FormEvent<HTMLFormElement>) => {
          const target = e.target as HTMLFormElement;
          dispatch(changeSizeOption(target.getAttribute('data-size') || ''));
        }}
      >
        <ul>
          {sizeOptions.map((el: string[], index: number) => {
            return (
              <li
                key={index}
                className={`${selectedOption === el[0] ? styles.selected : ''}`}
              >
                <label>
                  <input
                    type={'radio'}
                    name={'size'}
                    data-size={el[0]}
                    defaultChecked={selectedOption === el[0]}
                  />
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
          let fetchURL;
          if (props.photo?.src && hasKey(props.photo.src, selectedOption)) {
            fetchURL = props.photo.src[selectedOption];
          }
          if (fetchURL !== undefined) {
            const res = await fetch(fetchURL);
            const blob = await res.blob();
            const blobURL = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobURL;
            a.setAttribute(
              'download',
              `pexels-${props.photo?.photographer.replace(/\s/g, '-')}-${
                props.photo?.id
              }.jpg`
            );
            a.click();
            URL.revokeObjectURL(blobURL);
          }
        }}
      >
        Free Download
      </button>
    </div>
  );
}

export default Dropdown;

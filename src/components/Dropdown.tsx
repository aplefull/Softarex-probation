import React, { FormEvent, useCallback, useMemo, useState } from 'react';
import { PhotoObjectTypes } from '../redux/photosSlice';
import styles from '../css/components/Dropdown.module.scss';
import { hasKey } from '../utils/utils';
import classNames from 'classnames';

type DropdownProps = {
  photo: PhotoObjectTypes | null;
};

function Dropdown({ photo }: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState('original');

  const sizeOptions = useMemo(() => {
    if (photo?.src === undefined) return [];

    return Object.entries(photo.src).filter((el: string[]) => {
      return ['original', 'large', 'medium', 'small'].some((val: string) => val === el[0]);
    });
  }, [photo]);

  const handleFormChange = useCallback((e: FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLFormElement;
    setSelectedOption(target.getAttribute('data-size') || '');
  }, []);

  const handleDownloadClick = useCallback(async () => {
    const fetchURL = photo?.src && hasKey(photo.src, selectedOption) ? photo.src[selectedOption] : undefined;

    if (fetchURL !== undefined) {
      const res = await fetch(fetchURL);
      const blob = await res.blob();
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobURL;
      a.setAttribute('download', `pexels-${photo?.photographer.replace(/\s/g, '-')}-${photo?.id}.jpg`);
      a.click();
      URL.revokeObjectURL(blobURL);
    }
  }, [photo, selectedOption]);

  const listElementClassName = useCallback(
    (el) => {
      return classNames({ [styles.selected]: selectedOption === el });
    },
    [selectedOption]
  );

  return (
    <div className={styles.dropdownWrapper}>
      <p className={styles.text}>Choose a size:</p>
      <form onChange={handleFormChange}>
        <ul>
          {sizeOptions.map((el: string[], index: number) => {
            return (
              <li key={index} className={listElementClassName(el[0])}>
                <label>
                  <input type="radio" name="size" data-size={el[0]} defaultChecked={selectedOption === el[0]} />
                  <p>{el[0]}</p>
                </label>
              </li>
            );
          })}
        </ul>
      </form>
      <button className={styles.downloadButton} onClick={handleDownloadClick}>
        Free Download
      </button>
    </div>
  );
}

export default Dropdown;

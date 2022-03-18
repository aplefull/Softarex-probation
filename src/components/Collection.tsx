import React, { useEffect } from 'react';
import styles from '../css/components/Collection.module.scss';
import containerStyles from '../css/components/Photos.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { clearPhotos, loadCollectionPhotos } from '../redux/photosSlice';
import { PhotoObjectTypes } from '../redux/photosSlice';
import Photo from './Photo';

interface PropTypes {
  onPhotoClick: (id: number | null) => React.MouseEventHandler;
}

function Collection(props: PropTypes) {
  const dispatch = useDispatch();
  const { photos, columnsNumber } = useSelector((state: RootState) => state.photos);
  const collected = JSON.parse(localStorage.getItem('collected') || '[]');

  useEffect(() => {
    dispatch(clearPhotos());
    for (let i = 0; i < collected.length; i++) {
      dispatch(loadCollectionPhotos(collected[i]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let columnsArray: PhotoObjectTypes[][] = [...new Array(columnsNumber)].map(() => []);

  for (let i = 0; i < photos.length; i++) {
    columnsArray[i % columnsArray.length].push(photos[i]);
  }

  if (collected.length === 0)
    return (
      <div className={styles.noImages}>
        <h1>
          You don't have anything in your collection yet <span>😱 😱 😱</span>
        </h1>
      </div>
    );

  return (
    <>
      <h1 className={styles.title}>Your collection</h1>
      <div className={styles.container}>
        <div className={containerStyles.photosColumns}>
          {columnsArray.map((column: PhotoObjectTypes[], index: number) => (
            <div className={containerStyles.photosColumn} key={index}>
              {column.map((photo: PhotoObjectTypes, index: number) => (
                <Photo
                  onPhotoClick={props.onPhotoClick}
                  photoLink={`${photo.src.original}?auto=compress&cs=tinysrgb&dpr=1&w=800`}
                  photoURL={photo.url}
                  photographerURL={photo.photographer_url}
                  photographerName={photo.photographer}
                  photoId={photo.id}
                  key={index}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Collection;

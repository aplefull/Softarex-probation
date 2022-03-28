import React, { useEffect, useMemo } from 'react';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { PhotoObjectTypes } from '../redux/photosSlice';
import { clearPhotos, loadCollectionPhotos } from '../redux/photosSlice';
import containerStyles from '../css/components/Photos.module.scss';
import styles from '../css/components/Collection.module.scss';
import Photo from './Photo';

type CollectionProps = {
  onPhotoClick: (photo: PhotoObjectTypes) => () => void;
};

function Collection({ onPhotoClick }: CollectionProps) {
  const dispatch = useDispatch();
  const { photos, columnsNumber, collected } = useSelector((state: RootState) => state.photos);

  useEffect(() => {
    dispatch(clearPhotos());
    collected.forEach((photo) => {
      dispatch(loadCollectionPhotos(photo));
    });
  }, [collected, dispatch]);

  const columnsArray: PhotoObjectTypes[][] = useMemo(() => {
    const emptyColumns: PhotoObjectTypes[][] = [...new Array(columnsNumber)].map(() => []);

    for (let i = 0; i < photos.length; i++) {
      emptyColumns[i % emptyColumns.length].push(photos[i]);
    }

    return emptyColumns;
  }, [columnsNumber, photos]);

  if (collected.length === 0) {
    return (
      <div className={styles.noImages}>
        <h1>
          You don't have anything in your collection yet <span>😱 😱 😱</span>
        </h1>
      </div>
    );
  }

  return (
    <>
      <h1 className={styles.title}>Your collection</h1>
      <div className={styles.container}>
        <div className={containerStyles.photosColumns}>
          {columnsArray.map((column: PhotoObjectTypes[], index: number) => (
            <div className={containerStyles.photosColumn} key={index}>
              {column.map((photo: PhotoObjectTypes, index: number) => (
                <Photo
                  onPhotoClick={onPhotoClick(photo)}
                  photoLink={`${photo.src.original}?auto=compress&cs=tinysrgb&dpr=1&w=800`}
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

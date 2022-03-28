import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { InView } from 'react-intersection-observer';
import { RootState } from '../redux/store';
import { PhotoObjectTypes } from '../redux/photosSlice';
import { loadPhotos, performSearch } from '../redux/photosSlice';
import styles from '../css/components/Photos.module.scss';
import Photo from './Photo';

type PhotosProps = {
  onPhotoClick: (photo: PhotoObjectTypes) => () => void;
};

function Photos({ onPhotoClick }: PhotosProps) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { photos, currentPage, isLoading } = useSelector((state: RootState) => state.photos);
  const [columnsNumber, setColumnsNumber] = useState(4);

  const handleResize = useCallback(() => {
    let number: number;

    if (window.innerWidth < 624) {
      number = 1;
    } else if (window.innerWidth < 900) {
      number = 2;
    } else if (window.innerWidth < 1160) {
      number = 3;
    } else {
      number = 4;
    }

    setColumnsNumber(number);
  }, []);

  const handleInViewChange = useCallback(
    (inView: boolean) => {
      if (inView && !isLoading && location.pathname === '/') {
        dispatch(loadPhotos(currentPage));
      } else if (inView && !isLoading) {
        const searchQuery = decodeURIComponent((location.pathname.match(/(?<=\/)[^/]*$/) || [''])[0]);
        dispatch(performSearch({ value: searchQuery, page: currentPage }));
      }
    },
    [dispatch, isLoading, currentPage, location.pathname]
  );

  // Load initial photos on first page load
  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(loadPhotos(1));
    } else {
      const searchQuery = decodeURIComponent((location.pathname.match(/(?<=\/)[^/]*$/) || [''])[0]);
      dispatch(performSearch({ value: searchQuery, page: 1 }));
    }
  }, [dispatch, location.pathname]);

  // Set up listener to change number of columns on resize
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const columnsArray: PhotoObjectTypes[][] = useMemo(() => {
    const emptyColumns: PhotoObjectTypes[][] = [...new Array(columnsNumber)].map(() => []);

    for (let i = 0; i < photos.length; i++) {
      emptyColumns[i % emptyColumns.length].push(photos[i]);
    }

    return emptyColumns;
  }, [columnsNumber, photos]);

  if (photos.length === 0 && !isLoading) return <h2 className={styles.noMatches}>We couldn't find anything...</h2>;

  return (
    <div className={styles.photosColumns}>
      {columnsArray.map((column: PhotoObjectTypes[], index: number) => (
        <div className={styles.photosColumn} key={index}>
          {column.map((photo: PhotoObjectTypes, index: number) => (
            <Photo
              onPhotoClick={onPhotoClick(photo)}
              photoLink={`${photo.src.original}?auto=compress&cs=tinysrgb&dpr=1&w=400`}
              photographerURL={photo.photographer_url}
              photographerName={photo.photographer}
              photoId={photo.id}
              key={index}
            />
          ))}
        </div>
      ))}
      <InView as="div" className={styles.intersectionTracker} onChange={handleInViewChange}>
        <div />
      </InView>
    </div>
  );
}

export default Photos;

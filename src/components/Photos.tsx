import React, { useCallback, useEffect, useState } from 'react';
import styles from '../css/components/Photos.module.scss';
import Photo from './Photo';
import { useDispatch, useSelector } from 'react-redux';
import { InView } from 'react-intersection-observer';
import { RootState } from '../redux/store';
import { useLocation } from 'react-router-dom';
import { PhotoObjectTypes } from '../redux/photosSlice';
import { loadPhotos, performSearch, loadSearchedPhotos } from '../redux/photosSlice';

interface PropTypes {
  onPhotoClick: (id: number | null) => React.MouseEventHandler;
}

function Photos({ onPhotoClick }: PropTypes) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { photos, currentPage } = useSelector((state: RootState) => state.photos);
  const { isLoading, color, size, orientation } = useSelector((state: any) => state);
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

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(loadPhotos(currentPage));
    } else {
      let searchQuery = decodeURIComponent((location.pathname.match(/(?<=\/)[^/]*$/) || [''])[0]);
      dispatch(performSearch({ value: searchQuery, page: currentPage }));
    }

    window.addEventListener('resize', () => {
      handleResize();
    });

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, handleResize, location.pathname, currentPage]);

  let columnsArray: PhotoObjectTypes[][] = [...new Array(columnsNumber)].map(() => []);

  for (let i = 0; i < photos.length; i++) {
    columnsArray[i % columnsArray.length].push(photos[i]);
  }

  if (photos.length === 0 && !isLoading) return <h2 className={styles.noMatches}>We couldn't find anything...</h2>;

  return (
    <div className={styles.photosColumns}>
      {columnsArray.map((column: PhotoObjectTypes[], index: number) => (
        <div className={styles.photosColumn} key={index}>
          {column.map((photo: PhotoObjectTypes, index: number) => (
            <Photo
              onPhotoClick={onPhotoClick}
              photoLink={`${photo.src.original}?auto=compress&cs=tinysrgb&dpr=1&w=400`}
              photoURL={photo.url}
              photographerURL={photo.photographer_url}
              photographerName={photo.photographer}
              photoId={photo.id}
              key={index}
            />
          ))}
        </div>
      ))}
      <InView
        as={'div'}
        className={styles.intersectionTracker}
        onChange={(inView: boolean) => {
          if (inView && !isLoading && location.pathname === '/') {
            dispatch(loadPhotos(currentPage));
          } else if (inView && !isLoading) {
            let searchQuery = decodeURIComponent((location.pathname.match(/(?<=\/)[^/]*$/) || [''])[0]);

            if (color !== 'all') searchQuery += `&color=${color}`;
            if (size !== 'all') searchQuery += `&size=${size}`;
            if (orientation !== 'all') searchQuery += `&orientation=${orientation}`;

            dispatch(loadSearchedPhotos({ value: searchQuery, page: currentPage }));
          }
        }}
      >
        <div />
      </InView>
    </div>
  );
}

export default Photos;

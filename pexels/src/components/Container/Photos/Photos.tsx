import React, { useEffect } from 'react';
import styles from './Photos.module.scss';
import Photo from './Photo/Photo';
import { connect } from 'react-redux';
import {
  handleWindowResize,
  loadPhotos,
  loadSearchedPhotos,
  performSearch,
} from '../../../redux/actions';
import { InView } from 'react-intersection-observer';
import { RootState } from '../../../redux/rootReducer';
import { useLocation } from 'react-router-dom';
import { PhotoObjectTypes } from '../../../redux/photosReducer';

interface PropTypes {
  photos: PhotoObjectTypes[];
  currentPage: number;
  inputValue: string;
  isLoading: boolean;
  columnsNumber: number;
  loadPhotos: Function;
  loadSearchedPhotos: Function;
  performSearch: Function;
  handleWindowResize: Function;
}

function Photos(props: PropTypes) {
  const location = useLocation();

  function handleResize() {
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

    props.handleWindowResize(number);
  }

  useEffect(() => {
    if (location.pathname === '/') {
      props.loadPhotos(props.currentPage);
    } else {
      let searchQuery = decodeURIComponent(
        (location.pathname.match(/(?<=\/)[^/]*$/) || [''])[0]
      );
      props.performSearch(searchQuery, props.currentPage);
    }

    window.addEventListener('resize', () => {
      handleResize();
    });
    handleResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let columnsArray: PhotoObjectTypes[][] = [...new Array(props.columnsNumber)].map(() => []);

  for (let i = 0; i < props.photos.length; i++) {
    columnsArray[i % columnsArray.length].push(props.photos[i]);
  }

  return (
    <div className={styles.photosColumns}>
      {columnsArray.map((column: PhotoObjectTypes[], index: number) => (
        <div className={styles.photosColumn} key={index}>
          {column.map((photo: PhotoObjectTypes, index: number) => (
            <Photo
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
      <InView
        as={'div'}
        className={styles.intersectionTracker}
        onChange={(inView: boolean) => {
          if (inView && !props.isLoading && location.pathname === '/') {
            props.loadPhotos(props.currentPage);
          } else if (inView && !props.isLoading) {
            let searchQuery = decodeURIComponent(
              (location.pathname.match(/(?<=\/)[^/]*$/) || [''])[0]
            );
            props.loadSearchedPhotos(searchQuery, props.currentPage);
          }
        }}
      >
        <div />
      </InView>
    </div>
  );
}

function mapStateToProps(state: RootState) {
  return {
    photos: state.photosReducer.photos,
    currentPage: state.photosReducer.currentPage,
    isLoading: state.photosReducer.isLoading,
    columnsNumber: state.photosReducer.columnsNumber,
    inputValue: state.searchBarReducer.inputValue,
  };
}

const mapDispatchToProps = {
  loadPhotos,
  loadSearchedPhotos,
  performSearch,
  handleWindowResize,
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);

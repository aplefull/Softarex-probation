import React, { useEffect } from 'react';
import styles from './Photos.module.scss';
import Photo from './Photo/Photo';
import { connect } from 'react-redux';
import {
  loadPhotos,
  loadSearchedPhotos,
  performSearch,
} from '../../../redux/actions';
import { InView } from 'react-intersection-observer';
import { RootState } from '../../../redux/rootReducer';
import { useLocation } from 'react-router-dom';

interface PropTypes {
  photos: Array<any>;
  newPhotos: Array<any>;
  columnsArray: Array<any>;
  currentPage: number;
  inputValue: string;
  loadPhotos: Function;
  loadSearchedPhotos: Function;
  performSearch: Function;
  isLoading: boolean;
}

function Photos(props: PropTypes) {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      props.loadPhotos(props.currentPage);
    } else {
      let searchQuery = decodeURIComponent(
        (location.pathname.match(/(?<=\/)[^/]*$/) || [''])[0]
      );
      props.performSearch(searchQuery, props.currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.photosColumns}>
      {props.columnsArray.map((column: Array<any>, index: number) => (
        <div className={styles.photosColumn} key={index}>
          {column.map((photo: any, index: number) => (
            <Photo
              photoLink={`${photo.src.original}?auto=compress&cs=tinysrgb&dpr=1&w=800`}
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
    newPhotos: state.photosReducer.newPhotos,
    columnsArray: state.photosReducer.columnsArray,
    currentPage: state.photosReducer.currentPage,
    isLoading: state.photosReducer.isLoading,
    inputValue: state.searchBarReducer.inputValue,
  };
}

const mapDispatchToProps = {
  loadPhotos,
  loadSearchedPhotos,
  performSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);

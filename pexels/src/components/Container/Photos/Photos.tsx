import React, { useEffect } from 'react';
import styles from './Photos.module.scss';
import Photo from './Photo/Photo';
import { connect } from 'react-redux';
import { loadPhotos } from '../../../redux/actions';
import { InView } from 'react-intersection-observer';
import {RootState} from "../../../redux/rootReducer";

interface propTypes {
  photos: Array<any>;
  currentPage: number;
  loadPhotos: Function;
  isLoading: boolean;
}

function Photos(props: propTypes) {
  useEffect(() => {
    props.loadPhotos(props.currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO properly sort photos by columns, change number of columns on resize
  let columnsArray: Array<any> = [];
  if (window.innerWidth < 624) {
    columnsArray.push(props.photos);
  } else if (window.innerWidth < 900) {
    let chunkLength = Math.floor(props.photos.length / 2);
    for (let i = 0; i < 2; i++) {
      columnsArray.push(
        props.photos.slice(i * chunkLength, i * chunkLength + chunkLength)
      );
    }
  } else if (window.innerWidth < 1160) {
    let chunkLength = Math.floor(props.photos.length / 3);
    for (let i = 0; i < 3; i++) {
      columnsArray.push(
        props.photos.slice(i * chunkLength, i * chunkLength + chunkLength)
      );
    }
  } else {
    let chunkLength = Math.floor(props.photos.length / 4);
    for (let i = 0; i < 4; i++) {
      columnsArray.push(
        props.photos.slice(i * chunkLength, i * chunkLength + chunkLength)
      );
    }
  }

  return (
    <div className={styles.photosColumns}>
      {columnsArray.map((column: Array<any>, index: number) => (
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
          if (inView && !props.isLoading) {
            props.loadPhotos(props.currentPage);
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
    isLoading: state.photosReducer.isLoading
  };
}

const mapDispatchToProps = {
  loadPhotos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);

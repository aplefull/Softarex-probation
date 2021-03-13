import React, { useEffect } from 'react';
import styles from './Photos.module.scss';
import Photo from './Photo/Photo';
import { connect } from 'react-redux';
import { loadPhotos } from '../../../redux/actions';
import { InView } from 'react-intersection-observer';

interface propTypes {
  photos: Array<any>;
  currentPage: number;
  loadPhotos: Function;
}

function Photos(props: propTypes) {
  useEffect(() => {
    props.loadPhotos(props.currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  let columnsArray = [];
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
      {columnsArray.map((column, index) => (
        <div className={styles.photosColumn} key={index}>
          {column.map((photo, index) => (
            <Photo
              photoLink={`${photo.src.original}?auto=compress&cs=tinysrgb&dpr=1&w=800`}
              key={index}
            />
          ))}
        </div>
      ))}
      <InView
        as={'div'}
        className={styles.intersectionTracker}
        onChange={(inView) => {
          if (inView) {
            props.loadPhotos(props.currentPage);
          }
        }}
      >
        <div />
      </InView>
    </div>
  );
}

function mapStateToProps(state: any) {
  return {
    photos: state.photosReducer.photos,
    currentPage: state.photosReducer.currentPage
  };
}

const mapDispatchToProps = {
  loadPhotos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);

import React, { useEffect } from 'react';
import styles from './Collection.module.scss';
import containerStyles from '../Container/Photos/Photos.module.scss';
import { connect } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { clearPhotos, loadCollectionPhotos } from '../../redux/actions';
import { PhotoObjectTypes } from '../../redux/photosReducer';
import Photo from '../Container/Photos/Photo/Photo';

interface PropTypes {
  photos: PhotoObjectTypes[];
  columnsNumber: number;
  loadCollectionPhotos: Function;
  clearPhotos: Function;
}

function Collection(props: PropTypes) {
  const collected = JSON.parse(localStorage.getItem('collected') || '[]');

  useEffect(() => {
    props.clearPhotos();
    for (let i = 0; i < collected.length; i++) {
      props.loadCollectionPhotos(collected[i]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let columnsArray: PhotoObjectTypes[][] = [
    ...new Array(props.columnsNumber),
  ].map(() => []);

  for (let i = 0; i < props.photos.length; i++) {
    columnsArray[i % columnsArray.length].push(props.photos[i]);
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

function mapStateToProps(state: RootState) {
  return {
    photos: state.photosReducer.photos,
    columnsNumber: state.photosReducer.columnsNumber,
  };
}

const mapDispatchToProps = {
  loadCollectionPhotos,
  clearPhotos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);

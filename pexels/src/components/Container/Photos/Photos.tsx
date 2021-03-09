import React, { useEffect } from "react";
import styles from "./Photos.module.scss";
import Photo from "./Photo/Photo";
import { connect } from "react-redux";
import { loadPhotos } from "../../../redux/actions";

interface propTypes {
  photos: Array<any>;
  loadPhotos: Function;
}

function Photos(props: propTypes) {
  console.log(props);
  useEffect(() => {
    props.loadPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.photosColumns}>
      <div className={styles.photosColumn}>
        {props.photos.slice(0, 5).map((photo, index) => (
          <Photo
            photoLink={`${photo.src.original}?auto=compress&cs=tinysrgb&dpr=1&w=800`}
            key={index}
          />
        ))}
      </div>
      <div className={styles.photosColumn}>
        {props.photos.slice(5, 10).map((photo, index) => (
          <Photo
            photoLink={`${photo.src.original}?auto=compress&cs=tinysrgb&dpr=1&w=800`}
            key={index}
          />
        ))}
      </div>
      <div className={styles.photosColumn}>
        {props.photos.slice(10, 15).map((photo, index) => (
          <Photo
            photoLink={`${photo.src.original}?auto=compress&cs=tinysrgb&dpr=1&w=800`}
            key={index}
          />
        ))}
      </div>
      <div className={styles.photosColumn}>
        {props.photos.slice(15, 20).map((photo, index) => (
          <Photo
            photoLink={`${photo.src.original}?auto=compress&cs=tinysrgb&dpr=1&w=800`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

function mapStateToProps(state: any) {
  return {
    photos: state.photosReducer.photos,
  };
}

const mapDispatchToProps = {
  loadPhotos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);

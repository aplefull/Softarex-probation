import React from "react";
import styles from "./Photo.module.scss";

interface propTypes {
  photoLink: string;
}

function Photo(props: propTypes) {
  return (
    <div className={styles.photoWrapper}>
      <img src={props.photoLink} alt={"p-card"} className={styles.photoImage} />
    </div>
  );
}

export default Photo;

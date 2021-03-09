import React from "react";
import styles from "./Title.module.scss";

function Title() {
  return (
    <div className={styles.title}>
      <p>Free Stock Photos</p>
      <div className={styles.dropdown}>
        <p>Trending</p>
      </div>
    </div>
  );
}

export default Title;

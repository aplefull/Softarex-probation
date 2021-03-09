import React from "react";
import styles from "./SearchBar.module.scss";
import icon from "../../../icons/magnifying-glass.svg";

interface propTypes {
  isHidden?: boolean;
}

function SearchBar(props: propTypes) {
  return (
    <div
      className={`${styles.inputWrapper} ${
        props?.isHidden ? styles.hidden : ""
      }`}
    >
      <input type="text" placeholder="Search for free photos" />
      <img src={icon} alt="icon" />
    </div>
  );
}

export default SearchBar;

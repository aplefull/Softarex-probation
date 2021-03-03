import React from "react";
import styles from "./Container.module.scss";
import Title from "./Title/Title";
import Photos from "./Photos/Photos";

function Container() {
    return (
        <div className={styles.container}>
            <Title/>
            <Photos/>
        </div>
    );
}

export default Container;
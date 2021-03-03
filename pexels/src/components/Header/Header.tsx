import NavBar from "./NavBar/NavBar";
import React from "react";
import image from "../../images/temp.jpeg";
import styles from "./Header.module.scss";
import SearchBar from "./SearchBar/SearchBar";

function Header() {
    return (
        <header>
            <NavBar/>
            <img src={image} className={styles.headerImage} alt="background"/>
            <div className={styles.headerContentWrapper}>
                <h1>The best free stock photos & videos shared by talented creators.</h1>
                <SearchBar/>
                <div className={styles.suggestedWrapper}>
                    <p>Suggested:</p>
                    <div className={styles.suggestionsWrapper}>
                        <a href=''>lorem</a>
                        <a href=''>ipsum</a>
                        <a href=''>dolor</a>
                        <a href=''>sit</a>
                        <a href=''>amet</a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
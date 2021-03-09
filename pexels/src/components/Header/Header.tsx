import NavBar from "./NavBar/NavBar";
import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import SearchBar from "./SearchBar/SearchBar";
import { connect } from "react-redux";
import {
  getHeaderImage,
  showSearchBar,
  hideSearchBar,
} from "../../redux/actions";
import { suggestionsArray } from "../../suggestions";

interface propTypes {
  headerImage: string;
  isHidden: boolean;
  authorName: string;
  authorLink: string;
  getHeaderImage: Function;
  showSearchBar: Function;
  hideSearchBar: Function;
}

function Header(props: propTypes) {
  useEffect(() => {
    props.getHeaderImage();

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 250 && props.isHidden) {
        props.showSearchBar();
      } else if (window.pageYOffset < 250) {
        props.hideSearchBar();
      }
    });
    console.log("header image has been changed");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shuffledSuggestions = suggestionsArray.sort(() => 0.5 - Math.random());

  return (
    <header>
      <NavBar isHidden={props.isHidden} />
      <img
        src={props.headerImage}
        className={styles.headerImage}
        alt="background"
      />
      <div className={styles.headerContentWrapper}>
        <h1>
          The best free stock photos & videos shared by talented creators.
        </h1>
        <SearchBar />
        <div className={styles.suggestedWrapper}>
          <p>Suggested:</p>
          <div className={styles.suggestionsWrapper}>
            {shuffledSuggestions.slice(0, 7).map((suggestion) => {
              return (
                <a
                  href={`https://www.pexels.com/search/${suggestion}`}
                  key={suggestion}
                >
                  {suggestion}
                </a>
              );
            })}
            <a href={`https://www.pexels.com/popular-searches/`}>{"more"}</a>
          </div>
        </div>
      </div>
      <a
        href={props.authorLink}
        target={"_blank"}
        rel={"noreferrer"}
        className={styles.authorLink}
      >
        Photo by {props.authorName}
      </a>
    </header>
  );
}

function mapStateToProps(state: any) {
  return {
    headerImage: state.headerReducer.headerImage,
    isHidden: state.headerReducer.isHidden,
    authorName: state.headerReducer.authorName,
    authorLink: state.headerReducer.authorLink,
  };
}

const mapDispatchToProps = {
  getHeaderImage,
  showSearchBar,
  hideSearchBar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

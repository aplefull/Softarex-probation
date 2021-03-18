import NavBar from './NavBar/NavBar';
import React, { useEffect } from 'react';
import styles from './Header.module.scss';
import SearchBar from './SearchBar/SearchBar';
import { connect } from 'react-redux';
import { getHeaderImage } from '../../redux/actions';
import { suggestionsArray } from '../../suggestions';
import { useInView } from 'react-intersection-observer';

interface propTypes {
  headerImage: string;
  authorName: string;
  authorLink: string;
  getHeaderImage: Function;
}

const shuffledSuggestions: Array<string> = suggestionsArray.sort(() => 0.5 - Math.random());

function Header(props: propTypes) {
  useEffect(() => {
    props.getHeaderImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = {
    threshold: 0.5,
  };
  const { ref, inView } = useInView(options);

  return (
    <header>
      <NavBar isHidden={inView} />
      <img
        src={props.headerImage}
        className={styles.headerImage}
        alt="background"
        ref={ref}
      />
      <div className={styles.headerContentWrapper}>
        <h1>
          The best free stock photos & videos shared by talented creators.
        </h1>
        <SearchBar width={650} height={56}/>
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
            <a href={`https://www.pexels.com/popular-searches/`}>{'more'}</a>
          </div>
        </div>
      </div>
      <a
        href={props.authorLink}
        target={'_blank'}
        rel={'noreferrer'}
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
    authorName: state.headerReducer.authorName,
    authorLink: state.headerReducer.authorLink,
  };
}
const mapDispatchToProps = {
  getHeaderImage,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);

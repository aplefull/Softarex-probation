import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getHeaderImage } from '../redux/photosSlice';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { suggestionsArray } from '../constants';
import styles from '../css/components/Header.module.scss';
import NavBar from './NavBar';
import SearchBar from './SearchBar';

function Header() {
  const dispatch = useDispatch();
  const { headerImage, authorLink, authorName } = useSelector((state: RootState) => state.photos);
  const shuffledSuggestions = useMemo(() => suggestionsArray.sort(() => 0.5 - Math.random()), []);

  useEffect(() => {
    dispatch(getHeaderImage());
  }, [dispatch]);

  const { ref: imageRef, inView: imageInView } = useInView({
    threshold: 0.5,
  });

  return (
    <header>
      <NavBar isHidden={imageInView || !headerImage} />
      {headerImage && <img src={headerImage} className={styles.headerImage} alt="background" ref={imageRef} />}
      <div className={styles.headerContentWrapper}>
        <h1>The best free stock photos & videos shared by talented creators.</h1>
        <SearchBar width={650} height={56} />
        <div className={styles.suggestedWrapper}>
          <p>Suggested:</p>
          <div className={styles.suggestionsWrapper}>
            {shuffledSuggestions.slice(0, 7).map((suggestion: string) => {
              return (
                <Link to={`/search/${suggestion}`} key={suggestion}>
                  {suggestion}
                </Link>
              );
            })}
            <a href="https://www.pexels.com/popular-searches/">more</a>
          </div>
        </div>
      </div>
      <a href={authorLink} target="_blank" rel="noreferrer" className={styles.authorLink}>
        Photo by {authorName}
      </a>
    </header>
  );
}

export default Header;

import React from 'react';
import Header from './components/Header/Header';
import Tabs from './components/Tabs/Tabs';
import Container from './components/Container/Container';
import Modal from './components/Container/Photos/Photo/Modal/Modal';
import { useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchHeader from './components/SearchHeader/SearchHeader';
import Photos from './components/Container/Photos/Photos';
import Loading from './components/Container/Loading/Loading';
import styles from './components/Container/Container.module.scss';

function App() {
  const isHidden = useSelector(
    (state: RootState) => state.photosReducer.isHidden
  );

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'}>
          <>
            <Header />
            <Tabs />
            <Container />
            <Modal isHidden={isHidden} />
          </>
        </Route>
        <Route path={'/search'}>
          <>
            <SearchHeader />
            <div className={styles.container}>
              <Photos />
              <Loading />
            </div>
            <Modal isHidden={isHidden} />
          </>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

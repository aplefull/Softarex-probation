import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Modal from './components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import Photos from './components/Photos';
import Loading from './components/Loading';
import styles from './css/components/Container.module.scss';
import { initCollectibles, initLikes } from './redux/photosSlice';
import Collection from './components/Collection';
import NavBar from './components/NavBar';
import Title from './components/Title';
import { RootState } from './redux/store';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoId, setPhotoId] = useState<number | null>(null);

  const handlePhotoClick = useCallback(
    (id: number | null) => () => {
      setPhotoId(id);
      setIsModalOpen(true);
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.photos);

  useEffect(() => {
    dispatch(initLikes());
    dispatch(initCollectibles());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'}>
          <>
            <Header />
            <Tabs />
            <div className={styles.container}>
              <Title />
              <Photos onPhotoClick={handlePhotoClick} />
              <Loading isLoading={isLoading} />
            </div>
            <Modal isOpen={isModalOpen} handleCloseModal={handleCloseModal} photoId={photoId} />
          </>
        </Route>
        <Route path={'/search'}>
          <>
            <SearchHeader />
            <div className={styles.container}>
              <Photos onPhotoClick={handlePhotoClick} />
              <Loading isLoading={isLoading} />
            </div>
            <Modal isOpen={isModalOpen} handleCloseModal={handleCloseModal} photoId={photoId} />
          </>
        </Route>
        <Route exact path={'/collection'}>
          <NavBar isHidden={false} />
          <Collection onPhotoClick={handlePhotoClick} />
          <Modal isOpen={isModalOpen} handleCloseModal={handleCloseModal} photoId={photoId} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

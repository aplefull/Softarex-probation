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
import { initCollectibles, initLikes, PhotoObjectTypes } from './redux/photosSlice';
import Collection from './components/Collection';
import NavBar from './components/NavBar';
import Title from './components/Title';
import { RootState } from './redux/store';

function App() {
  const [openedPhoto, setOpenedPhoto] = useState<PhotoObjectTypes | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePhotoClick = useCallback(
    (photo) => () => {
      setOpenedPhoto(photo);
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
            <Modal isOpen={isModalOpen} handleCloseModal={handleCloseModal} photo={openedPhoto} />
          </>
        </Route>
        <Route path={'/search'}>
          <>
            <SearchHeader />
            <div className={styles.container}>
              <Photos onPhotoClick={handlePhotoClick} />
              <Loading isLoading={isLoading} />
            </div>
            <Modal isOpen={isModalOpen} handleCloseModal={handleCloseModal} photo={openedPhoto} />
          </>
        </Route>
        <Route exact path={'/collection'}>
          <NavBar isHidden={false} />
          <Collection onPhotoClick={handlePhotoClick} />
          <Modal isOpen={isModalOpen} handleCloseModal={handleCloseModal} photo={openedPhoto} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

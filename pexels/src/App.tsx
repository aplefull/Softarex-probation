import React from 'react';
import Header from './components/Header/Header';
import Tabs from './components/Tabs/Tabs';
import Container from './components/Container/Container';
import Modal from './components/Container/Photos/Photo/Modal/Modal';
import { useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';

function App() {
  const isHidden = useSelector(
    (state: RootState) => state.photosReducer.isHidden
  );

  return (
    <>
      <Header />
      <Tabs />
      <Container />
      <Modal isHidden={isHidden} />
    </>
  );
}

export default App;

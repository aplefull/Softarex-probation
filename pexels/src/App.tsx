import React from 'react';
import Header from './components/Header/Header';
import Tabs from './components/Tabs/Tabs';
import Container from './components/Container/Container';
import Modal from './components/Container/Photos/Photo/Modal/Modal';
import { useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from "./components/Header/NavBar/NavBar";

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
        <Route exact path={'/search'}>
          <>
            <NavBar isHidden={false}/>
            <Container/>
          </>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

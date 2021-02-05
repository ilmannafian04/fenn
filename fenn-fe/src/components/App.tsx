import { Container, Toolbar } from '@material-ui/core';
import React from 'react';

import Home from './Home';
import NavBar from './NavBar';
import NavDrawer from './NavDrawer';

const App = () => {
  return (
    <>
      <NavBar />
      <NavDrawer />
      <Container>
        <Toolbar />
        <Home />
      </Container>
    </>
  );
};

export default App;

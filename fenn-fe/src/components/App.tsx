import { Box, Container, createStyles, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

import NavBar from './navs/NavBar';
import NavDrawer from './navs/NavDrawer';
import Home from './Home';

const useStyles = makeStyles((theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();
  return (
    <Box display="flex">
      <NavBar drawerState={drawerOpen} drawerOpenFn={setDrawerOpen} />
      <NavDrawer open={drawerOpen} setOpen={setDrawerOpen} />
      <Container className={classes.content}>
        <div className={classes.toolbar} />
        <Home />
      </Container>
    </Box>
  );
};

export default App;

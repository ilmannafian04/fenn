import { Box, Container, createStyles, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

import Home from './Home';
import NavBar from './NavBar';
import NavDrawer from './NavDrawer';

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

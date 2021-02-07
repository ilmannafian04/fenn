import { Box, Container, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';

import NavBar from './NavBar';
import NewPoll from './NewPoll';

const useStyles = makeStyles((theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
  })
);

const App = () => {
  const classes = useStyles();
  return (
    <Box display="flex">
      <NavBar />
      <Container>
        <div className={classes.toolbar} />
        <NewPoll />
      </Container>
    </Box>
  );
};

export default App;

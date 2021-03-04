import { Box, Container, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from './NavBar';
import routes from './routes';

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
        <Switch>
          {routes.map((value, index) => (
            <Route path={value.path} key={index} exact={value.exact}>
              {value.el}
            </Route>
          ))}
        </Switch>
      </Container>
    </Box>
  );
};

export default App;

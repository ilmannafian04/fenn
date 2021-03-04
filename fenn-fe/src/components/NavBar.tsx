import { AppBar, Box, Button, createStyles, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) =>
  createStyles({
    navbarPosition: { zIndex: theme.zIndex.drawer + 1 },
  })
);

const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" color="inherit" className={classes.navbarPosition}>
      <Toolbar>
        <Typography variant="h4">Fenn</Typography>
        <Box flexGrow={1} />
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

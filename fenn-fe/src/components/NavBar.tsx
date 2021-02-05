import React from 'react';
import { AppBar, Box, Button, createStyles, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navbarPosition: { zIndex: theme.zIndex.drawer + 1 },
  })
);

const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" color="inherit" className={classes.navbarPosition}>
      <Toolbar>
        <Typography variant="h6">Fenn</Typography>
        <Box flexGrow={1} />
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

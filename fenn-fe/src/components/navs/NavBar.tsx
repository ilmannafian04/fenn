import { AppBar, Box, Button, createStyles, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { FunctionComponent } from 'react';

interface INavBarProps {
  drawerState: boolean;
  drawerOpenFn: (open: boolean) => null;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    navbarPosition: { zIndex: theme.zIndex.drawer + 1 },
    drawerButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  })
);

const NavBar: FunctionComponent<INavBarProps> = ({ drawerOpenFn, drawerState }: INavBarProps) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" color="inherit" className={classes.navbarPosition}>
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() => drawerOpenFn(!drawerState)}
          edge="start"
          className={classes.drawerButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Fenn</Typography>
        <Box flexGrow={1} />
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

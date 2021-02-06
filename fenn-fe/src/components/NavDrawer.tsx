import {
  createStyles,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import PollIcon from '@material-ui/icons/Poll';
import React, { FunctionComponent } from 'react';

interface INavDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => null;
}

const drawerWidth = 240;
const useStyles = makeStyles((theme) =>
  createStyles({
    drawerPaper: {
      width: drawerWidth,
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
  })
);

const NavDrawer: FunctionComponent<INavDrawerProps> = ({ open, setOpen }: INavDrawerProps) => {
  const classes = useStyles();
  const drawerContent = (
    <>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <PollIcon />
          </ListItemIcon>
          <ListItemText primary="New poll" />
        </ListItem>
      </List>
    </>
  );
  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          open={open}
          onClose={() => setOpen(!open)}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawerContent}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default NavDrawer;

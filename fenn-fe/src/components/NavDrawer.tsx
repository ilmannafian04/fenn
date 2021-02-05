import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@material-ui/core';

const NavDrawer = () => {
  return (
    <Drawer variant="permanent">
      <Toolbar />
      <List>
        <ListItem button>
          <ListItemText>Test</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default NavDrawer;

import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@material-ui/core';

import {FullPageLoader} from 'components';
import {SIDEBAR_ITEMS_LIST} from './config';

const useStyles = makeStyles(theme => ({
  root: {display: 'flex', height: '100%'},
  appBar: {zIndex: theme.zIndex.drawer + 1},
  drawer: {width: 300, flexShrink: 0},
  drawerPaper: {width: 300},
  drawerContainer: {overflow: 'auto'},
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: 'fit-content',
  },
  link: {textDecoration: 'none', color: 'inherit'},
  children: {padding: theme.spacing(3)},
}));

const DrawerWrapper = ({children, isLoading}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>Application Title</Typography>
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>
        <Toolbar />
        <div className={classes.drawerContainer}>
          {SIDEBAR_ITEMS_LIST.map((list, index, array) => (
            <Fragment key={index}>
              <List>
                {list.map(({label, icon, route}) => (
                  <Link to={route} key={label} className={classes.link}>
                    <ListItem button key={label}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={label} />
                    </ListItem>
                  </Link>
                ))}
              </List>
              {index !== array.length - 1 && <Divider />}
            </Fragment>
          ))}
        </div>
      </Drawer>
      {isLoading
        ? <FullPageLoader />
        : (
          <main className={classes.content}>
            <Toolbar />
            <Paper elevation={2} className={classes.children}>
              {children}
            </Paper>
          </main>
        )}

    </div>
  );
};

export default DrawerWrapper;

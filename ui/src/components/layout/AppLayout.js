import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  MenuItem,
  Menu,
} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';

import {logOut} from 'features/SignInPage/authSlice';
import {FullPageLoader} from 'components';

const useStyles = makeStyles(theme => ({
  root: {display: 'flex', height: '100%'},
  appBar: {zIndex: theme.zIndex.AppLayout + 1},
  toolbar: {display: 'flex', justifyContent: 'space-between'},
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100vh',
  },
  children: {padding: theme.spacing(3)},
  childrenSmall: {width: 700, margin: 'auto'},
  loadingChildren: {height: 'calc(100% - 72px)'},
}));

const AppLayout = ({children, isLoading, small}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        {loggedUser.email && (
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" noWrap>
              {`Welcome ${loggedUser.firstName} ${loggedUser.lastName}!`}
            </Typography>
            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
              keepMounted
              transformOrigin={{vertical: 'top', horizontal: 'right'}}
              open={!!anchorEl}
              onClose={handleClose}
            >
              <MenuItem onClick={() => dispatch(logOut())}>Log Out</MenuItem>
            </Menu>
          </Toolbar>
        )}
      </AppBar>
      <main className={classes.content}>
        <Toolbar />
        <Paper
          elevation={6}
          className={`${classes.children} ${isLoading ? classes.loadingChildren : ''} ${small ? classes.childrenSmall : ''}`}
        >
          {isLoading ? <FullPageLoader /> : children}
        </Paper>
      </main>
    </div>
  );
};

export default AppLayout;

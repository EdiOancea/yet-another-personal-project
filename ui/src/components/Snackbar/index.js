import React from 'react';
import {Snackbar as MuiSnackbar} from '@material-ui/core';
import {Alert, AlertTitle} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {width: '100%'},
  snack: {top: 72, width: 400},
  title: {textTransform: 'capitalize'},
  alert: {width: 400, wordBreak: 'break-all'},
}));

const Snackbar = ({severity, message, open = !!message, close}) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    close();
  };

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      classes={{anchorOriginTopCenter: classes.snack}}
    >
      <Alert
        elevation={6}
        onClose={handleClose}
        severity={severity}
        className={classes.alert}
      >
        <AlertTitle className={classes.title}>{severity}</AlertTitle>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;

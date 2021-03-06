import React from 'react';
import {IconButton, CircularProgress} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {display: 'flex', alignItems: 'center'},
  wrapper: {position: 'relative', width: 'fit-content'},
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  delete: {color: theme.palette.error.main},
}));

const SubmitButton = ({isLoading, onClick}) => {
  const classes = useStyles();

  return (
    <span className={classes.wrapper}>
      <IconButton
        className={classes.delete}
        disabled={isLoading}
        onClick={onClick}
      >
        <Delete />
      </IconButton>
      {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </span>
  );
};

export default SubmitButton;

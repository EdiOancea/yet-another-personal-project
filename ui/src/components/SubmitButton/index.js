import React from 'react';
import {Button, CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {display: 'flex', alignItems: 'center'},
  wrapper: {position: 'relative', width: 'fit-content'},
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const SubmitButton = ({isLoading, onClick, children}) => {
  const classes = useStyles();

  return (
    <span className={classes.wrapper}>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isLoading}
        onClick={onClick}
      >
        {children}
      </Button>
      {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </span>
  );
};

export default SubmitButton;

import React from 'react';
import {Button, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '100px 0',
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
}));

const EmptyTableBody = ({text, buttonText, onClick}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6">{text}</Typography>
      <Button variant="contained" color="primary" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
};

export default EmptyTableBody;

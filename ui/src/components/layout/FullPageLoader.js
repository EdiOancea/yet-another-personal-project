import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {CircularProgress} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  loaderWrapper: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

const FullPageLoader = ({size = 200}) => {
  const classes = useStyles();

  return (
    <div className={classes.loaderWrapper}>
      <CircularProgress width={size} height={size} />
    </div>
  );
};

export default FullPageLoader;

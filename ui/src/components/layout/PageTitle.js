import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles(theme => ({title: {paddingBottom: theme.spacing(3)}}));

const PageTitle = ({title}) => {
  const classes = useStyles();

  return (
    <Typography className={classes.title} variant="h4" component="h1">
      {title}
    </Typography>
  );
};

export default PageTitle;

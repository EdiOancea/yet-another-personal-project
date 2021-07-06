import React from 'react';
import {Chip} from '@material-ui/core';
import {isBefore} from 'date-fns';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  incoming: {backgroundColor: theme.palette.warning.main},
  ongoing: {backgroundColor: theme.palette.info.main},
}));

const QuizStatus = ({entity: {quiz: {startDate, endDate, graded}}}) => {
  const classes = useStyles();
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isBefore(now, start)) {
    return <Chip label="Incoming" className={classes.incoming} />;
  }

  if (isBefore(now, end)) {
    return <Chip label="Ongoing" className={classes.ongoing} />;
  }

  return <Chip label={graded ? 'Graded' : 'Done'} color="secondary" />;
};

export default QuizStatus;

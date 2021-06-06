import React from 'react';
import {Chip} from '@material-ui/core';
import {isBefore} from 'date-fns';

const QuizStatus = ({entity: {startDate, endDate}}) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isBefore(now, start)) {
    return <Chip label="Incoming" color="secondary" />;
  }

  if (isBefore(now, end)) {
    return <Chip label="Ongoing" color="primary" />;
  }

  return <Chip label="Done" />;
};

export default QuizStatus;

import React from 'react';
import {useHistory} from 'react-router';
import {Button} from '@material-ui/core';
import {isBefore} from 'date-fns';

const QuizAction = ({entity: {quiz: {id, startDate, endDate}}}) => {
  const history = useHistory();
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isBefore(now, start)) {
    return <Button onClick={() => history.push(`/quiz/${id}/assign`)}>Assign</Button>;
  }

  if (isBefore(now, end)) {
    return null;
  }

  return <Button onClick={() => history.push(`/quiz/${id}/grade`)}>Grade</Button>;
};

export default QuizAction;

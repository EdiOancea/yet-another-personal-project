import React, {useState, useEffect, Fragment} from 'react';
import {Typography} from '@material-ui/core';

import {formatDistanceToNow, isPast} from 'date-fns';

const QuizTimer = ({startDate}) => {
  const [dueIn, setDueIn] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDueIn(formatDistanceToNow(startDate, {includeSeconds: true}));
      if (isPast(startDate)) {
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return dueIn && (
    <Fragment>
      <Typography>
        {`The quiz is due in ${dueIn}.`}
      </Typography>
      <Typography>
        This page will reload when the quiz starts.
      </Typography>
    </Fragment>
  );
};

export default QuizTimer;

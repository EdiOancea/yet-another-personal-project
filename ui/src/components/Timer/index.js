import React, {useEffect, useState} from 'react';
import {Typography} from '@material-ui/core';
import {isPast, differenceInSeconds} from 'date-fns';

const Timer = ({referenceDate}) => {
  const [timerValue, setTimerValue] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (!referenceDate) {
        return;
      }

      if (isPast(referenceDate)) {
        window.location.reload();
      }

      const diff = differenceInSeconds(referenceDate, new Date());
      const hours = Math.floor(diff / 60 / 60);
      const hourString = `${hours > 9 ? '' : '0'}${hours}`;
      const minutes = Math.floor(diff / 60) % 60;
      const minuteString = `${minutes > 9 ? '' : '0'}${minutes}`;
      const seconds = diff % 60;
      const secondString = `${seconds > 9 ? '' : '0'}${seconds}`;

      setTimerValue(`${hourString}:${minuteString}:${secondString}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [referenceDate]);

  return timerValue && (
    <Typography variant="h4">
      {timerValue}
    </Typography>
  );
};

export default Timer;

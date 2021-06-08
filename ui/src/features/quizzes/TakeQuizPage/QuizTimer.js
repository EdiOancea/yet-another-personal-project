import React, {useState, useEffect} from 'react';
import {formatDistanceToNow} from 'date-fns';

const QuizTimer = ({startDate}) => {
  const [left, setLeft] = useState('');

  useEffect(() => {
    console.log(formatDistanceToNow(startDate));
  }, [startDate]);

  return <div>left</div>;
};

export default QuizTimer;

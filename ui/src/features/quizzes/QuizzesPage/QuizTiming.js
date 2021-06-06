import {isBefore, formatDistanceToNow} from 'date-fns';

const QuizTiming = ({entity: {startDate, endDate}}) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isBefore(now, start)) {
    return formatDistanceToNow(start);
  }

  if (isBefore(now, end)) {
    return `Ends in ${formatDistanceToNow(end)}`;
  }

  return `Ended ${formatDistanceToNow(end)} ago`;
};

export default QuizTiming;

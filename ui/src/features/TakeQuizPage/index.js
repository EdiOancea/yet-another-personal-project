import React from 'react';
import {Typography} from '@material-ui/core';
import {useParams} from 'react-router';
import {useQuery} from 'react-query';
import {isFuture} from 'date-fns';

import {PageTitle, AppLayout} from 'components';
import api from 'utils/api';
import QuizForm from './QuizForm';
import QuizTimer from './QuizTimer';
import QuizReview from './QuizReview';

const TakeQuizPage = () => {
  const {quizId} = useParams();
  const quizQuery = useQuery(
    ['quiz', quizId],
    () => api.get(`/quiz/${quizId}`)
  );

  const startDate = new Date(quizQuery.data?.startDate);
  const endDate = new Date(quizQuery.data?.endDate);

  return (
    <AppLayout isLoading={quizQuery.isLoading}>
      <PageTitle title={quizQuery.data?.title} />
      <Typography variant="h5">{quizQuery.data?.description}</Typography>
      {isFuture(startDate)
        ? <QuizTimer startDate={startDate} />
        : isFuture(endDate)
          ? <QuizForm questions={quizQuery.data?.questions} />
          : <QuizReview quiz={quizQuery.data} /> }
    </AppLayout>
  );
};

export default TakeQuizPage;

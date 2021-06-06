import React from 'react';
import {useParams} from 'react-router';
import {useQuery} from 'react-query';
import {isPast, isFuture} from 'date-fns';

import DrawerWrapper from 'features/drawer/Drawer';
import {PageTitle} from 'components';
import api from 'utils/api';
import QuizForm from './QuizForm';

const TakeQuizPage = () => {
  const {quizId} = useParams();
  const quizQuery = useQuery(
    ['quiz', quizId],
    () => api.get(`/quiz/${quizId}`)
  );

  const startDate = new Date(quizQuery.data?.startDate);
  const endDate = new Date(quizQuery.data?.endDate);

  return (
    <DrawerWrapper isLoading={quizQuery.isLoading}>
      <PageTitle title={quizQuery.data?.description} />
      {isFuture(startDate) && 'todo'}
      {isPast(startDate) && isFuture(endDate) && <QuizForm questions={quizQuery.data?.questions} />}
      <QuizForm questions={quizQuery.data?.questions} />
    </DrawerWrapper>
  );
};

export default TakeQuizPage;

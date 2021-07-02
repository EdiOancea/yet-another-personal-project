import React from 'react';
import {useParams, useHistory} from 'react-router';
import {useQuery} from 'react-query';

import api from 'utils/api';
import {AppLayout, PageTitle, CrudTable} from 'components';

const QuizGradesPage = () => {
  const history = useHistory();
  const {quizId} = useParams();
  const quizGradesQuery = useQuery(
    ['quizGrades', quizId, 'grades'],
    () => api.get(`/quiz/${quizId}/grades`)
  );

  return (
    <AppLayout isLoading={quizGradesQuery.isLoading}>
      <PageTitle title={quizGradesQuery.data?.title} />
      <CrudTable
        columns={[
          {header: 'First Name', key: 'user.firstName'},
          {header: 'Last Name', key: 'user.lastName'},
          {header: 'Final Grade', key: 'finalGrade'},
        ]}
        onEdit={({userId}) => history.push(`/quiz/${quizId}/grade/${userId}`)}
        entities={quizGradesQuery.data?.associations}
      />
    </AppLayout>
  );
};

export default QuizGradesPage;

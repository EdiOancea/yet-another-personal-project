import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import {useParams, useHistory} from 'react-router';
import {useQuery, useMutation, useQueryClient} from 'react-query';

import api from 'utils/api';
import {AppLayout, PageTitle, SubmitButton, CrudTable, Snackbar} from 'components';

const QuizGradesPage = () => {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const history = useHistory();
  const {quizId} = useParams();
  const queryClient = useQueryClient();
  const queryKey = ['quizGrades', quizId, 'grades'];
  const quizGradesQuery = useQuery(queryKey, () => api.get(`/quiz/${quizId}/grades`));
  const markAsGradedMutation = useMutation(
    () => api.post(`/quiz/${quizId}/grade`),
    {
      onSuccess: () => {
        setSnackbarMessage('Quiz is marked as graded successfully');
        queryClient.setQueryData(queryKey, quiz => ({...quiz, graded: true}));
      },
    }
  );

  return (
    <AppLayout isLoading={quizGradesQuery.isLoading}>
      <Snackbar message={snackbarMessage} close={() => setSnackbarMessage('')} />
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

      <SubmitButton
        onClick={markAsGradedMutation.mutate}
        disabled={!markAsGradedMutation.isLoading && quizGradesQuery.data?.graded}
        isLoading={markAsGradedMutation.isLoading}
      >
        Mark as Graded
      </SubmitButton>
      <Button onClick={history.goBack}>Go Back</Button>
    </AppLayout>
  );
};

export default QuizGradesPage;

import React, {useState, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {Button} from '@material-ui/core';

import api from 'utils/api';
import {PageTitle, CrudTable, AppLayout} from 'components';

import QuizStatus from './QuizStatus';
import QuizTiming from './QuizTiming';
import QuizAction from './QuizAction';
const PAGE_SIZE = 5;

const QuizzesPage = () => {
  const history = useHistory();
  const userType = useSelector(state => state.auth.user.type);
  const isProfessor = userType === 'professor';
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [entityIdBeingDeleted, setEntityIdBeingDeleted] = useState('');
  const queryKey = ['quizzes', 'page', page];

  const getQuizzesQuery = useQuery(
    queryKey,
    () => api
      .get(`/quiz-associations?pageSize=${PAGE_SIZE}&page=${page}`)
      .then(res => {
        setCount(res.count);

        return res.rows;
      }),
    {keepPreviousData: true, refetchInterval: 60000},
  );

  const entities = useMemo(
    () => getQuizzesQuery.data || [],
    [getQuizzesQuery.data]
  );
  const deleteQuizMutation = useMutation(
    ({quizId}) => api.delete(`/quiz/${quizId}`),
    {
      onMutate: ({id}) => {
        setEntityIdBeingDeleted(id);
        queryClient.cancelQueries(queryKey);
      },
      onSuccess: (_, {id}) => {
        queryClient.setQueryData(queryKey, quizzes => quizzes.filter(quiz => quiz.id !== id));
        queryClient.invalidateQueries(queryKey);
        setEntityIdBeingDeleted('');
      },
    }
  );

  return (
    <AppLayout isLoading={getQuizzesQuery.isLoading}>
      <PageTitle title="Quizzes" />
      <CrudTable
        columns={[
          {header: 'Title', key: 'quiz.title'},
          {header: '', Component: QuizTiming},
          {header: 'Status', Component: QuizStatus},
          ...isProfessor
            ? [{header: 'Action', Component: QuizAction}]
            : [{header: 'Final Grade', key: 'finalGrade'}],
        ]}
        entities={entities}
        entityIdBeingDeleted={entityIdBeingDeleted}
        isLoading={getQuizzesQuery.isLoading}
        onEdit={({quizId}) => history.push(`/quiz/${quizId}/${isProfessor ? '' : 'take'}`)}
        onDelete={isProfessor && deleteQuizMutation.mutate}
        paginationProps={{page, setPage, rowsPerPage: PAGE_SIZE, count}}
        emptyTableProps={{
          text: 'There are no quizzes available',
          buttonText: 'Create a Quiz',
          onClick: () => history.push('/quiz'),
        }}
      />
      {isProfessor && !!entities.length && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push('/quiz')}
        >
          Create a Quiz
        </Button>
      )}
    </AppLayout>
  );
};

export default QuizzesPage;

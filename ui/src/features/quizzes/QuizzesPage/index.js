import React, {useState, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {useQuery, useMutation} from 'react-query';
import {Button} from '@material-ui/core';

import api from 'utils/api';
import DrawerWrapper from 'features/drawer/Drawer';
import {PageTitle, CrudTable} from 'components';

import QuizStatus from './QuizStatus';
import QuizTiming from './QuizTiming';
const PAGE_SIZE = 5;

const QuizzesPage = () => {
  const history = useHistory();
  const userType = useSelector(state => state.auth.user.type);
  const isProfessor = userType === 'professor';
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [entityIdBeingDeleted, setEntityIdBeingDeleted] = useState('');

  const getQuizzesQuery = useQuery(
    ['quizzes', 'page', page],
    () => api
      .get(`/quiz?pageSize=${PAGE_SIZE}&page=${page}`)
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
    id => api.delete(`/quiz/${id}`),
    {
      onMutate: setEntityIdBeingDeleted,
      onSuccess: () => {
        getQuizzesQuery.refetch();
        setEntityIdBeingDeleted('');
      },
    }
  );

  return (
    <DrawerWrapper isLoading={getQuizzesQuery.isLoading}>
      <PageTitle title="Quizzes" />
      <CrudTable
        columns={[
          {header: 'Description', key: 'description'},
          {header: '', Component: QuizTiming},
          {header: 'Status', Component: QuizStatus},
        ]}
        entities={entities}
        entityIdBeingDeleted={entityIdBeingDeleted}
        isLoading={getQuizzesQuery.isLoading}
        onEdit={id => history.push(`/quiz/${id}/${isProfessor ? '' : 'take'}`)}
        onDelete={isProfessor && deleteQuizMutation.mutate}
        paginationProps={{page, setPage, rowsPerPage: PAGE_SIZE, count}}
        emptyTableProps={{
          text: 'There are no quizzes available',
          buttonText: 'Create a Quiz',
          onClick: () => history.push('/quiz'),
        }}
      />
      {isProfessor
        && <Button onClick={() => history.push('/quiz')}>Create a Quiz</Button>}
    </DrawerWrapper>
  );
};

export default QuizzesPage;

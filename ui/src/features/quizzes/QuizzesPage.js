import React, {useState, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {useQuery, useMutation} from 'react-query';
import {Button} from '@material-ui/core';
import {format} from 'date-fns';
import api from 'utils/api';
import DrawerWrapper from 'features/drawer/Drawer';

import {PageTitle, CrudTable} from 'components';

const PAGE_SIZE = 5;

const QuizzesPage = () => {
  const history = useHistory();
  const userType = useSelector(state => state.auth.user.type);
  const isProfessor = userType === 'professor';
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const getQuizzesQuery = useQuery(
    ['quizzes', 'page', page],
    () => api
      .get(`/quiz?pageSize=${PAGE_SIZE}&page=${page}`)
      .then(res => {
        setCount(res.count);

        return res.quizzes;
      }),
    {keepPreviousData: true},
  );

  const entities = useMemo(
    () => (getQuizzesQuery.data || [])
      .map(({startDate, endDate, ...rest}) => ({
        ...rest,
        startDate: format(new Date(startDate), 'HH:mm dd/MM'),
        endDate: format(new Date(endDate), 'HH:mm dd/MM'),
      })),
    [getQuizzesQuery.data]
  );
  const deleteQuizMutation = useMutation(
    id => api.delete(`/quiz/${id}`),
    {onSuccess: getQuizzesQuery.refetch}
  );

  return (
    <DrawerWrapper isLoading={getQuizzesQuery.isLoading}>
      <PageTitle title="Quizzes" />
      <CrudTable
        headers={['Description', 'Start Date', 'End Date']}
        rowKeys={['description', 'startDate', 'endDate']}
        entities={entities}
        isLoading={getQuizzesQuery.isLoading}
        onEdit={id => history.push(`/quiz/${id}/${isProfessor ? '' : 'take'}`)}
        onDelete={isProfessor && deleteQuizMutation.mutate}
        paginationProps={{page, setPage, rowsPerPage: PAGE_SIZE, count}}
      />
      {isProfessor
        && <Button onClick={() => history.push('/quiz')}>Add a quiz</Button>}
    </DrawerWrapper>
  );
};

export default QuizzesPage;

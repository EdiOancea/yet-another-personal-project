import React, {Fragment, useState} from 'react';
import {useHistory} from 'react-router';
import {useQuery, useMutation} from 'react-query';
import {Button} from '@material-ui/core';

import api from 'utils/api';
import DrawerWrapper from 'features/drawer/Drawer';

import {PageTitle, CrudTable, FullPageLoader} from 'components';

const PAGE_SIZE = 5;

const QuizzesPage = () => {
  const history = useHistory();
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

  const deleteQuizMutation = useMutation(
    id => api.delete(`/quiz/${id}`),
    {onSuccess: getQuizzesQuery.refetch}
  );

  return (
    <DrawerWrapper>
      {getQuizzesQuery.isLoading
        ? <FullPageLoader />
        : (
          <Fragment>
            <PageTitle title="Quizzes" />
            <CrudTable
              headers={['Description']}
              rowKeys={['description']}
              entities={getQuizzesQuery.data}
              isLoading={getQuizzesQuery.isLoading}
              onEdit={id => history.push(`/quiz/${id}`)}
              onDelete={deleteQuizMutation.mutate}
              paginationProps={{page, setPage, rowsPerPage: PAGE_SIZE, count}}
            />
            <Button onClick={() => history.push('/quiz')}>Add a quiz</Button>
          </Fragment>
        )}
    </DrawerWrapper>
  );
};

export default QuizzesPage;

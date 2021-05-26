import React, {Fragment, useMemo} from 'react';
import {useQuery, useMutation} from 'react-query';
import {useParams, useHistory} from 'react-router';
import {Button, CircularProgress} from '@material-ui/core';

import api from 'utils/api';
import DrawerWrapper from 'features/drawer/Drawer';
import {CrudTable, FullPageLoader, PageTitle} from 'components';
import {useTableSelection} from 'components/CrudTable/helpers';

const AssignQuizPage = () => {
  const history = useHistory();
  const {quizId} = useParams();
  const quizQuery = useQuery(
    ['quiz', quizId],
    () => api.get(`/quiz/${quizId}`)
  );
  const quizAssignationMapQuery = useQuery(
    ['quizAssignationMap', quizId],
    () => api.get(`/quiz/${quizId}/assign-map`)
  );
  const preselectedStudents = useMemo(
    () => (quizAssignationMapQuery.data || []).filter(student => student.assigned).map(student => student.id),
    [quizAssignationMapQuery.data]
  );
  const selectionProps = useTableSelection(quizAssignationMapQuery.data, preselectedStudents);
  const assignStudentsMutation = useMutation(
    () => api.post(`/quiz/${quizId}/assign`, {studentIds: selectionProps.selected}),
    {onSuccess: history.goBack}
  );

  return (
    <DrawerWrapper>
      {quizAssignationMapQuery.isLoading || quizQuery.isLoading
        ? <FullPageLoader />
        : (
          <Fragment>
            <PageTitle title={quizQuery.data.description} />
            <CrudTable
              title="Assign students to this quiz"
              headers={['First Name', 'Last Name']}
              rowKeys={['firstName', 'lastName']}
              entities={quizAssignationMapQuery.data}
              selectionProps={selectionProps}
            />
            {assignStudentsMutation.isLoading
              ? <CircularProgress />
              : <Button onClick={assignStudentsMutation.mutate}>Assign</Button>}
          </Fragment>
        )}
    </DrawerWrapper>
  );
};

export default AssignQuizPage;

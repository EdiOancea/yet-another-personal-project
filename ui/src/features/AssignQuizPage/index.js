import React, {useMemo} from 'react';
import {useQuery, useMutation} from 'react-query';
import {useParams} from 'react-router';

import api from 'utils/api';
import {
  CrudTable,
  PageTitle,
  SubmitButton,
  AppLayout,
} from 'components';
import {useTableSelection} from 'components/CrudTable/helpers';

const AssignQuizPage = () => {
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
    () => (quizAssignationMapQuery.data || [])
      .filter(student => !!student.version)
      .map(student => student.id),
    [quizAssignationMapQuery.data]
  );
  const selectionProps = useTableSelection(quizAssignationMapQuery.data, preselectedStudents);
  const assignStudentsMutation = useMutation(
    () => api.post(`/quiz/${quizId}/assign`, {studentIds: selectionProps.selected}),
    {onSuccess: quizAssignationMapQuery.refetch}
  );

  return (
    <AppLayout isLoading={quizAssignationMapQuery.isLoading || quizQuery.isLoading}>
      <PageTitle title={quizQuery.data?.title} />
      <CrudTable
        columns={[
          {header: 'First Name', key: 'firstName'},
          {header: 'Last Name', key: 'lastName'},
          {header: 'Version', key: 'version'},
        ]}
        title="Assign students to this quiz"
        entities={quizAssignationMapQuery.data}
        selectionProps={selectionProps}
      />
      <SubmitButton
        isLoading={assignStudentsMutation.isLoading}
        onClick={assignStudentsMutation.mutate}
      >
        Assign
      </SubmitButton>
    </AppLayout>
  );
};

export default AssignQuizPage;

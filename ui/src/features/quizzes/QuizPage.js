import React, {Fragment} from 'react';
import {useHistory, useParams} from 'react-router';
import {useMutation, useQuery} from 'react-query';
import {Button, CircularProgress} from '@material-ui/core';
import {Formik, Form} from 'formik';
import * as yup from 'yup';

import api from 'utils/api';
import {FullPageLoader, PageTitle} from 'components';
import {TextField, DateTimeField} from 'utils/form';
import DrawerWrapper from 'features/drawer/Drawer';

const initialValues = {
  description: '',
  startDate: null,
  endDate: null,
};

const validationSchema = yup.object().shape({
  description: yup.string().required('Required'),
  startDate: yup.date().required('Required').nullable(),
  endDate: yup.date().required('Required').nullable(),
});

const QuizPage = () => {
  const history = useHistory();
  const {quizId} = useParams();
  const quizQuery = useQuery(
    ['quizzes', quizId],
    () => api.get(`/quiz/${quizId}`),
    {enabled: !!quizId},
  );
  const updateQuizMutation = useMutation(quiz => api.put(`/quiz/${quizId}`, quiz));
  const createQuizMutation = useMutation(({quiz, onSuccess}) => api.post('/quiz', quiz).then(onSuccess));
  const onSubmit = quizId
    ? updateQuizMutation.mutate
    : quiz => createQuizMutation.mutate({quiz, onSuccess: ({id}) => history.push(`/quiz/${id}`)});

  return (
    <DrawerWrapper>
      {quizQuery.isLoading
        ? <FullPageLoader />
        : (
          <Fragment>
            <PageTitle title={quizId ? 'Update Quiz' : 'Add Quiz'} />
            <Formik
              initialValues={quizId ? quizQuery.data : initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <TextField name="description" label="Description" />
                <DateTimeField name="startDate" label="Start Date" />
                <DateTimeField name="endDate" label="End Date" />
                {createQuizMutation.isLoading || updateQuizMutation.isLoading
                  ? <CircularProgress size={24} />
                  : <Button type="submit" color="primary">{quizId ? 'Save' : 'Create'}</Button>}
                {quizId && (
                  <Button
                    type="secondary"
                    onClick={() => history.push(`${history.location.pathname}/assign`)}
                  >
                    Assign quiz
                  </Button>
                )}
              </Form>
            </Formik>
          </Fragment>
        )}

    </DrawerWrapper>
  );
};

export default QuizPage;

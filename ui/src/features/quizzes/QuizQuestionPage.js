import React from 'react';
import {useParams, useHistory} from 'react-router';
import {useMutation, useQuery} from 'react-query';
import {Button, CircularProgress} from '@material-ui/core';
import {Formik, Form} from 'formik';
import * as yup from 'yup';

import api from 'utils/api';
import {PageTitle} from 'components';
import {TextField, SelectField} from 'utils/form';
import DrawerWrapper from 'features/drawer/Drawer';

import QuizQuestionAnswersTable from './QuizQuestionAnswersTable';

const initialValues = {
  statement: '',
  type: 'essay',
  availablePoints: 0,
  version: 1,
  answers: [{isCorrect: false, statement: ''}],
};

const validationSchema = yup.object().shape({
  statement: yup.string().required('Required'),
  availablePoints: yup
    .number()
    .integer('Must be an integer')
    .min(0, 'Available points can\'t be below 0')
    .required('Required'),
  version: yup
    .number()
    .integer('Must be an integer')
    .min(1, 'The version should be between 1 and 3')
    .max(3, 'The version should be between 1 and 3')
    .required('Required'),
});

const QuizQuestionPage = () => {
  const {quizId, questionId} = useParams();
  const history = useHistory();
  const questionQuery = useQuery(
    ['quiz', quizId, 'question', questionId],
    () => api.get(`/quiz/${quizId}/question/${questionId}`),
    {enabled: !!questionId},
  );
  const createQuestionMutation = useMutation(
    question => api.post(`/quiz/${quizId}/question`, question),
    {onSuccess: history.goBack}
  );
  const updateQuestionMutation = useMutation(
    question => api.put(`/quiz/${quizId}/question/${questionId}`, question),
    {onSuccess: history.goBack}
  );
  const onSubmit = questionId
    ? updateQuestionMutation.mutate
    : createQuestionMutation.mutate;

  return (
    <DrawerWrapper isLoading={questionQuery.isLoading}>
      <PageTitle title={questionId ? 'Update Question' : 'Add Question'} />
      <Formik
        initialValues={questionId ? questionQuery.data : initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <TextField name="statement" label="Question Statement" />
          <TextField type="number" name="availablePoints" label="Available Points" />
          <TextField type="number" name="version" label="Version" />
          <SelectField
            name="type"
            label="Question Type"
            options={[
              {label: 'Essay', value: 'essay'},
              {label: 'Single option', value: 'singleOption'},
              {label: 'Multiple options', value: 'multipleOptions'},
            ]}
          />
          <QuizQuestionAnswersTable name="answers" />
          {questionId && (
            updateQuestionMutation.isLoading
              ? <CircularProgress size={24} />
              : <Button color="primary" type="submit">Save</Button>
          )}
          {questionId && <Button variant="secondary" onClick={history.goBack}>Cancel</Button>}
          {!questionId && (
            createQuestionMutation.isLoading
              ? <CircularProgress size={24} />
              : <Button color="primary" type="submit">Add</Button>
          )}
        </Form>
      </Formik>
    </DrawerWrapper>
  );
};

export default QuizQuestionPage;

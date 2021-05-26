import React, {Fragment} from 'react';
import {useParams, useHistory} from 'react-router';
import {useMutation, useQuery} from 'react-query';
import {Button, CircularProgress} from '@material-ui/core';
import {Formik, Form} from 'formik';
import * as yup from 'yup';

import api from 'utils/api';
import {FullPageLoader, PageTitle} from 'components';
import {TextField, SelectField} from 'utils/form';
import DrawerWrapper from 'features/drawer/Drawer';

import QuizQuestionAnswersTable from './QuizQuestionAnswersTable';

const initialValues = {
  statement: '',
  type: 'essay',
  answers: [{isCorrect: false, statement: ''}],
};

const validationSchema = yup.object().shape({});

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
    <DrawerWrapper>
      {questionQuery.isLoading
        ? <FullPageLoader />
        : (
          <Fragment>
            <PageTitle title={questionId ? 'Update Question' : 'Add Question'} />
            <Formik
              initialValues={questionId ? questionQuery.data : initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <TextField name="statement" label="Question Statement" />
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
          </Fragment>
        )}
    </DrawerWrapper>
  );
};

export default QuizQuestionPage;

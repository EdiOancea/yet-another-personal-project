import React, {Fragment} from 'react';
import {useParams} from 'react-router';
import {useMutation, useQuery} from 'react-query';
import {Button} from '@material-ui/core';
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
  const questionQuery = useQuery(
    ['quiz', quizId, 'question', questionId],
    () => api.get(`/quiz/${quizId}/question/${questionId}`),
    {enabled: !!questionId},
  );
  const createQuestionMutation = useMutation(question => api.post(`/quiz/${quizId}/question`, question));
  const updateQuestionMutation = useMutation(question => api.put(`/quiz/${quizId}/question/${questionId}`, question));
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
                <Button variant="primary" type="submit">Submit</Button>
              </Form>
            </Formik>
          </Fragment>
        )}
    </DrawerWrapper>
  );
};

export default QuizQuestionPage;

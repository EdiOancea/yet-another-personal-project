import React from 'react';
import {useParams, useHistory} from 'react-router';
import {useMutation, useQuery} from 'react-query';
import {Button, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Formik, Form} from 'formik';
import * as yup from 'yup';

import api from 'utils/api';
import {
  PageTitle,
  TextField,
  SelectField,
  RadioGroup,
  SubmitButton,
  AppLayout,
} from 'components';

import QuizQuestionAnswersTable from './QuizQuestionAnswersTable';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '20px',
  },
  paper: {padding: theme.spacing(3)},
}));
const initialValues = {
  statement: '',
  type: 'essay',
  availablePoints: 0,
  version: 'a',
  answers: [{isCorrect: false, statement: ''}],
};

const validationSchema = yup.object().shape({
  statement: yup.string().required('Required'),
  availablePoints: yup
    .number()
    .integer('Must be an integer')
    .min(0, 'Available points can\'t be below 0')
    .required('Required'),
  version: yup.string().required('Required'),
});

const QuizQuestionPage = () => {
  const classes = useStyles();
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
    <AppLayout isLoading={questionQuery.isLoading}>
      <PageTitle title={questionId ? 'Update Question' : 'Add Question'} />
      <Formik
        initialValues={questionId ? questionQuery.data : initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({values}) => (
          <Form>
            <div className={classes.wrapper}>
              <Paper elevation={3} className={classes.paper}>
                <TextField name="statement" label="Question Statement" />
                <TextField type="number" name="availablePoints" label="Available Points" />
                <RadioGroup
                  name="version"
                  label="Version"
                  options={[
                    {label: 'A', value: 'a'},
                    {label: 'B', value: 'b'},
                    {label: 'C', value: 'c'},
                  ]}
                />
                <SelectField
                  name="type"
                  label="Question Type"
                  options={[
                    {label: 'Essay', value: 'essay'},
                    {label: 'Single option', value: 'singleOption'},
                    {label: 'Multiple options', value: 'multipleOptions'},
                  ]}
                />
              </Paper>
              {values.type !== 'essay' && (
                <Paper elevation={3} className={classes.paper}>
                  <QuizQuestionAnswersTable name="answers" />
                </Paper>
              )}
            </div>
            <SubmitButton isLoading={updateQuestionMutation.isLoading || createQuestionMutation.isLoading}>
              {questionId ? 'Save' : 'Create'}
            </SubmitButton>
            {questionId && <Button variant="secondary" onClick={history.goBack}>Cancel</Button>}
          </Form>
        )}
      </Formik>
    </AppLayout>
  );
};

export default QuizQuestionPage;

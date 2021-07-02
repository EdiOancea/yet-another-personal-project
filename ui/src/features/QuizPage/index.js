import React, {useState} from 'react';
import {useHistory, useParams} from 'react-router';
import {useMutation, useQuery} from 'react-query';
import {Button, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Formik, Form} from 'formik';
import * as yup from 'yup';
// import {isPast} from 'date-fns';

import api from 'utils/api';
import {
  PageTitle,
  TextField,
  DateTimeField,
  SubmitButton,
  AppLayout,
  Snackbar,
} from 'components';
import QuizQuestions from './QuizQuestions';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '20px',
  },
  paper: {padding: theme.spacing(3)},
}));

const initialValues = {
  title: '',
  description: '',
  startDate: new Date(),
  endDate: new Date(),
};

const validationSchema = yup.object().shape({
  title: yup.string().required('Required'),
  description: yup.string(),
  startDate: yup.date().required('Required'),
  endDate: yup
    .date()
    .required('Required')
    .min(yup.ref('startDate'), 'End date must be before start date'),
});

const QuizPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const {quizId} = useParams();
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const quizQuery = useQuery(
    ['quiz', quizId],
    () => api.get(`/quiz/${quizId}`),
    {enabled: !!quizId},
  );
  const updateQuizMutation = useMutation(
    quiz => api.put(`/quiz/${quizId}`, quiz),
    {
      onSuccess: () => setSnackbarMessage('Quiz is successfully updated!'),
      onError: setSnackbarMessage,
    }
  );
  const createQuizMutation = useMutation(
    quiz => api.post('/quiz', quiz),
    {onSuccess: ({id}) => history.push(`/quiz/${id}`)}
  );
  const onSubmit = quizId ? updateQuizMutation.mutate : createQuizMutation.mutate;
  // const isReadOnly = isPast(new Date(quizQuery?.data?.startDate));
  const isReadOnly = false;
  const title = !quizId
    ? 'Add Quiz'
    : isReadOnly
      ? 'View Quiz'
      : 'Update Quiz';

  return (
    <AppLayout isLoading={quizQuery.isLoading}>
      <Snackbar message={snackbarMessage} close={() => setSnackbarMessage('')} />
      <PageTitle title={title} />
      <div className={classes.wrapper}>
        <Paper elevation={3} className={classes.paper}>
          <Formik
            initialValues={quizId ? quizQuery.data : initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <TextField name="title" label="Title" disabled={isReadOnly} />
              <TextField
                name="description"
                multiline
                rows={5}
                label="Description"
                disabled={isReadOnly}
              />
              <DateTimeField name="startDate" label="Start Date" disabled={isReadOnly} />
              <DateTimeField name="endDate" label="End Date" disabled={isReadOnly} />
              <SubmitButton isLoading={createQuizMutation.isLoading || updateQuizMutation.isLoading}>
                {quizId ? 'Save' : 'Create'}
              </SubmitButton>
              <Button type="secondary" onClick={history.goBack}>Cancel</Button>
            </Form>
          </Formik>
        </Paper>
        {quizId && (
          <Paper elevation={3} className={classes.paper}>
            <QuizQuestions questions={quizQuery.data?.questions} isReadOnly={isReadOnly} />
          </Paper>
        )}
      </div>
    </AppLayout>
  );
};

export default QuizPage;

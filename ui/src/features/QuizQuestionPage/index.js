import React, {useState} from 'react';
import {useParams, useHistory} from 'react-router';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {Button, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Formik, Form} from 'formik';
import * as yup from 'yup';

import api from 'utils/api';
import {
  PageTitle,
  TextField,
  RadioGroup,
  CheckboxGroup,
  SubmitButton,
  Snackbar,
  AppLayout,
} from 'components';

import QuizQuestionAnswersTable from './QuizQuestionAnswersTable';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '20px',
  },
  paper: {display: 'flex', padding: theme.spacing(3), flexDirection: 'column'},
}));

const DEFAULT_VERSION = {a: false, b: false, c: false};
const DEFAULT_ANSWER = {isCorrect: false, statement: ''};
const QUESTION_VERSION_OPTIONS = [
  {label: 'A', value: 'a'},
  {label: 'B', value: 'b'},
  {label: 'C', value: 'c'},
];
const QUESTION_TYPE_OPTIONS = [
  {label: 'Essay', value: 'essay'},
  {label: 'Single option', value: 'singleOption'},
  {label: 'Multiple options', value: 'multipleOptions'},
];
const INITIAL_VALUES = {
  statement: '',
  explanation: '',
  type: 'essay',
  availablePoints: 1,
  version: DEFAULT_VERSION,
  answers: [DEFAULT_ANSWER],
};

const validationSchema = yup.object().shape({
  statement: yup.string().required('Required'),
  explanation: yup.string().nullable(),
  availablePoints: yup
    .number()
    .integer('Must be an integer')
    .min(1, 'Available points can\'t be below 0')
    .required('Required'),
  version: yup
    .object()
    .shape({a: yup.boolean(), b: yup.boolean(), c: yup.boolean()})
    .test(
      'at-least-one-selected',
      'At least one version should be selected',
      version => Object.values(version).some(Boolean),
    ),
  answers: yup
    .mixed()
    .when('type', {
      is: 'multipleOptions',
      then: yup
        .array()
        .of(
          yup
            .object()
            .shape({
              isCorrect: yup.boolean(),
              statement: yup.string().required('Required'),
            })
        )
        .min(2, 'There should be at least 2 possible answers')
        .test(
          'at-least-one-correct',
          'At least one answer should be correct',
          answers => answers.some(({isCorrect}) => isCorrect),
        ),
    })
    .when('type', {
      is: 'singleOption',
      then: yup
        .array()
        .of(
          yup
            .object()
            .shape({
              isCorrect: yup.boolean(),
              statement: yup.string().required('Required'),
            })
        )
        .min(2, 'There should be at least 2 possible answers')
        .test(
          'exactly-one-correct',
          'Exactly one answer should be correct',
          answers => answers.filter(({isCorrect}) => isCorrect).length === 1,
        ),
    }),
});

const QuizQuestionPage = () => {
  const classes = useStyles();
  const {quizId, questionId} = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const queryKey = ['quiz', quizId, 'question', questionId];
  const fetchQuiz = () => api
    .get(`/quiz/${quizId}/question/${questionId}`)
    .then(({version, ...rest}) => ({
      ...rest,
      version: version.split(',').reduce((acc, vers) => ({
        ...acc,
        [vers]: true,
      }), DEFAULT_VERSION),
    }));
  const questionQuery = useQuery(queryKey, fetchQuiz, {enabled: !!questionId});
  const createQuestionMutation = useMutation(
    question => api.post(`/quiz/${quizId}/question`, question),
    {onSuccess: history.goBack}
  );
  const updateQuestionMutation = useMutation(
    question => api.put(`/quiz/${quizId}/question/${questionId}`, question),
    {
      onSuccess: () => {
        setSnackbarMessage('Question is successfully updated!');
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
  const onSubmit = questionId ? updateQuestionMutation.mutate : createQuestionMutation.mutate;
  const pageTitle = questionId ? 'Update Question' : 'Add Question';
  const initialValues = questionId ? questionQuery.data : INITIAL_VALUES;
  const handleSubmit = values => onSubmit({
    ...values,
    version: Object
      .entries(values.version)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(','),
  });
  const isMutationRunning = updateQuestionMutation.isLoading || createQuestionMutation.isLoading;
  const submitLabel = questionId ? 'Save' : 'Create';

  return (
    <AppLayout isLoading={questionQuery.isLoading}>
      <Snackbar message={snackbarMessage} close={() => setSnackbarMessage('')} />
      <PageTitle title={pageTitle} />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({values: {type}}) => (
          <Form>
            <div className={classes.wrapper}>
              <Paper elevation={3} className={classes.paper}>
                <TextField name="statement" label="Question Statement" multiline />
                <TextField name="explanation" label="Optional Question Explanation" multiline />
                <TextField type="number" name="availablePoints" label="Available Points" />
                <CheckboxGroup
                  name="version"
                  label="Version"
                  options={QUESTION_VERSION_OPTIONS}
                  row
                />
                <RadioGroup name="type" label="Question Type" options={QUESTION_TYPE_OPTIONS} />
                <span>
                  <SubmitButton isLoading={isMutationRunning}>{submitLabel}</SubmitButton>
                  <Button onClick={history.goBack}>Cancel</Button>
                </span>
              </Paper>
              {type !== 'essay' && (
                <Paper elevation={3} className={classes.paper}>
                  <QuizQuestionAnswersTable name="answers" />
                </Paper>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </AppLayout>
  );
};

export default QuizQuestionPage;

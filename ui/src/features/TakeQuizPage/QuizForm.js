import React, {useState} from 'react';
import {useParams} from 'react-router';
import {useMutation} from 'react-query';
import {Formik, Form} from 'formik';
import {makeStyles} from '@material-ui/core/styles';

import api from 'utils/api';
import {SubmitButton, Snackbar} from 'components';
import EssayQuestion from './EssayQuestion';
import SingleOptionQuestion from './SingleOptionQuestion';
import MultipleOptionsQuestion from './MultipleOptionsQuestion';

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const getInitialValues = (questions, answeredQuestions) => questions.reduce(
  (res, {id, type, answers}) => {
    const previousAnswer = answeredQuestions.find(answeredQuestion => answeredQuestion.questionId === id);
    const initialAnswer = previousAnswer?.answer || '';

    return {
      ...res,
      [id]: type === 'essay'
        ? initialAnswer
        : type === 'multipleOptions'
          ? answers.reduce((acc, answer) => ({
            ...acc,
            [answer.id]: initialAnswer.split(',').includes(answer.id),
          }), {})
          : initialAnswer,
    };
  },
  {}
);

const parseValues = (questions, values) => questions
  .reduce((acc, {id, type}) => ({
    ...acc,
    [id]: type === 'essay'
      ? values[id]
      : type === 'singleOption'
        ? values[id]
        : Object
          .entries(values[id])
          .filter(([, value]) => value)
          .map(([answerId]) => answerId)
          .join(','),
  }), {});

const QuizForm = ({questions, answeredQuestions, isReadOnly}) => {
  const classes = useStyles();
  const {quizId} = useParams();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const submitFormMutation = useMutation(
    values => api.post(`/quiz/${quizId}/submit`, parseValues(questions, values)),
    {onSuccess: () => setSnackbarMessage('Quiz saved successfully')}
  );

  return (
    <Formik
      initialValues={getInitialValues(questions, answeredQuestions)}
      onSubmit={submitFormMutation.mutate}
    >
      <Form className={classes.form}>
        <Snackbar message={snackbarMessage} close={() => setSnackbarMessage('')} />
        {questions.map(({type, ...rest}) => {
          switch (type) {
            case 'essay':
              return <EssayQuestion question={rest} isReadOnly={isReadOnly} />;
            case 'singleOption':
              return <SingleOptionQuestion question={rest} isReadOnly={isReadOnly} />;
            case 'multipleOptions':
              return <MultipleOptionsQuestion question={rest} isReadOnly={isReadOnly} />;
            default:
              return null;
          }
        })}
        <SubmitButton isLoading={submitFormMutation.isLoading}>
          Save
        </SubmitButton>
      </Form>
    </Formik>
  );
};
export default QuizForm;

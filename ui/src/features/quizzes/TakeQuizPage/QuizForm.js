import React from 'react';
import {useParams} from 'react-router';
import {useMutation} from 'react-query';
import {Formik, Form} from 'formik';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import api from 'utils/api';
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

const getInitialValues = questions => questions.reduce(
  (res, {id, type, answers}) => ({
    ...res,
    [id]: type === 'essay'
      ? ''
      : type === 'multipleOptions'
        ? answers.reduce((acc, answer) => ({...acc, [answer.id]: false}), {})
        : answers[0].id,
  }),
  {}
);

const parseValues = (questions, values) => questions
  .reduce((acc, {id, type}) => ({
    ...acc,
    [id]: type === 'essay'
      ? values[id]
      : type === 'singleOption'
        ? [values[id]]
        : Object
          .entries(values[id])
          .filter(([_, value]) => value)
          .map(([answerId]) => answerId),
  }), {});

const QuizForm = ({questions}) => {
  const classes = useStyles();
  const {quizId} = useParams();
  const submitFormMutation = useMutation(
    values => api.post(`/quiz/${quizId}/submit`, parseValues(questions, values)),
    {onSuccess: (...args) => console.log(args)}
  );

  return (
    <Formik
      initialValues={getInitialValues(questions)}
      onSubmit={submitFormMutation.mutate}
    >
      {() => (
        <Form className={classes.form}>
          {questions.map(({type, ...rest}) => {
            switch (type) {
              case 'essay':
                return <EssayQuestion question={rest} />;
              case 'singleOption':
                return <SingleOptionQuestion question={rest} />;
              case 'multipleOptions':
                return <MultipleOptionsQuestion question={rest} />;
              default:
                return null;
            }
          })}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default QuizForm;

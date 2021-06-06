import React from 'react';
import {Formik, Form} from 'formik';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

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

const QuizForm = ({questions}) => {
  const classes = useStyles();

  return (
    <Formik initialValues={getInitialValues(questions)}>
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

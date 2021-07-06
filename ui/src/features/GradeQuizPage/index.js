import React, {useState, Fragment} from 'react';
import {Typography, Grid, Chip, Button, Paper} from '@material-ui/core';
import {Formik, Form} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import {useParams, useHistory} from 'react-router';
import {useQuery, useMutation} from 'react-query';
import * as yup from 'yup';

import api from 'utils/api';
import {
  AppLayout,
  ReadOnlySelection,
  SubmitButton,
  TextField,
  PageTitle,
  Snackbar,
} from 'components';

const useStyles = makeStyles(theme => ({
  question: {padding: '20px 0'},
  column: {display: 'flex', flexDirection: 'column', paddingRight: 20},
  peerReviewPaper: {backgroundColor: theme.palette.offwhite.main},
  peerReview: {display: 'flex', justifyContent: 'space-between'},
}));

const getValidationSchema = data => yup.object().shape({
  grades: yup.object().shape(
    data.reduce((acc, {availablePoints, type, answeredQuestion: {id}}) => type !== 'essay'
      ? acc
      : {
        ...acc,
        [id]: yup
          .number()
          .integer('Must be an integer')
          .required('Required')
          .min(0, 'You can\'t give a negative grade')
          .max(availablePoints, `You can only grade this answer by up to ${availablePoints} points`),
      },
    {}
    )
  ),
  finalGrade: yup
    .number()
    .integer('Must be an integer')
    .required('Required')
    .min(1, '1 is the min grade')
    .max(10, '10 is the max grade'),
  comment: yup.string(),
});

const getInitialValues = (questions, quizAssociation) => ({
  comments: questions.reduce(
    (acc, {type, answeredQuestion: {id, comment}}) => type !== 'essay'
      ? acc
      : {...acc, [id]: comment},
    {}
  ),
  grades: questions.reduce(
    (acc, {type, answeredQuestion: {id, points}}) => type !== 'essay'
      ? acc
      : {...acc, [id]: points},
    {}
  ),
  comment: quizAssociation.comment,
  finalGrade: quizAssociation.finalGrade,
});

const GradeQuizPage = () => {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const classes = useStyles();
  const {quizId, userId} = useParams();
  const history = useHistory();
  const quizQuery = useQuery(
    ['quiz', quizId, 'grades', userId],
    () => api.get(`/quiz/${quizId}/grades/${userId}`)
  );
  const gradeMutation = useMutation(
    ({quizAssociationId, values}) => api.post(`/quiz-association/${quizAssociationId}/grade`, values),
    {onSuccess: () => setSnackbarMessage('This quiz has been graded successfully')}
  );
  const {quiz, quizAssociation} = quizQuery.data || {};
  const parsedQuestions = (quiz?.questions || [])
    .map(question => {
      const answeredQuestion = (quiz?.answeredQuestions || []).find(({questionId}) => questionId === question.id);

      return {...question, answeredQuestion};
    })
    .filter(({answeredQuestion}) => answeredQuestion);
  const studentName = `${quizAssociation?.user.firstName} ${quizAssociation?.user.lastName}`;

  return (
    <AppLayout isLoading={quizQuery.isLoading}>
      <Snackbar message={snackbarMessage} close={() => setSnackbarMessage('')} />
      <Formik
        initialValues={{...getInitialValues(parsedQuestions, quizAssociation || {})}}
        validationSchema={getValidationSchema(parsedQuestions)}
        onSubmit={values => gradeMutation.mutate({quizAssociationId: quizAssociation?.id, values})}
      >
        <Form>
          <PageTitle title={`Grade "${quiz?.title}"`} />
          <Typography
            color="primary"
            variant="h4"
          >
            {`${studentName}'s answers`}
          </Typography>
          {parsedQuestions.map(({answers, id, type, statement, availablePoints, answeredQuestion}) => {
            const derivedAnswers = answers.map(answer => ({
              ...answer,
              isCorrect: answeredQuestion.answer.split(',').includes(answer.id),
            }));

            return (
              <div key={id} className={classes.question}>
                <Typography variant="h5">{statement}</Typography>
                <Grid container>
                  <Grid item xs={6} className={`${classes.column}`}>
                    <Typography variant="h6">Answer</Typography>
                    {type === 'essay'
                      ? (
                        <Fragment>
                          <Typography>{answeredQuestion.answer || 'No answer given'}</Typography>
                          <Paper elevation={0} className={classes.peerReviewPaper}>
                            <div className={classes.peerReview}>
                              <Typography variant="h6">{`${quizAssociation?.peer.firstName} ${quizAssociation?.peer.lastName}'s review`}</Typography>
                              <Chip
                                color="secondary"
                                style={{width: 'fit-content'}}
                                label={`${answeredQuestion.peerPoints} out of ${availablePoints} points`}
                              />
                            </div>
                            <Typography>{answeredQuestion.peerComment || 'No comment'}</Typography>
                          </Paper>
                        </Fragment>
                      )
                      : <ReadOnlySelection options={derivedAnswers} type={type} />}
                  </Grid>
                  {type === 'essay'
                    ? (
                      <Grid item xs={6} className={classes.column}>
                        <TextField name={`grades.${answeredQuestion.id}`} label={`Grade this answer (out of ${availablePoints})`} type="number" />
                        <TextField name={`comments.${answeredQuestion.id}`} label="Provide Feedback" multiline />
                      </Grid>
                    )
                    : (
                      <Grid item xs={6} className={classes.column}>
                        <Typography variant="h6">Correct Answer</Typography>
                        <ReadOnlySelection options={answers} type={type} />
                      </Grid>
                    )}
                </Grid>
                {type !== 'essay' && (
                  <Chip
                    color="primary"
                    label={`${answeredQuestion.points} out of ${availablePoints} points`}
                  />
                )}
              </div>
            );
          })}
          <Typography variant="h5">Final Grade</Typography>
          <div>
            <TextField name="finalGrade" label="" type="number" fullWidth={false} />
          </div>
          <SubmitButton isLoading={gradeMutation.isLoading}>Grade</SubmitButton>
          <Button onClick={history.goBack}>Go Back</Button>
        </Form>
      </Formik>
    </AppLayout>
  );
};

export default GradeQuizPage;

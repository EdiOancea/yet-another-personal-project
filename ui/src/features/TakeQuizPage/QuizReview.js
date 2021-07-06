import React from 'react';
import {useHistory} from 'react-router';
import {FormControl, Chip, Typography, Grid, Button, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {ReadOnlySelection} from 'components';

const useStyles = makeStyles(theme => ({
  question: {padding: '20px 0'},
  column: {display: 'flex', flexDirection: 'column', paddingRight: 20},
  peerReview: {display: 'flex', justifyContent: 'space-between', backgroundColor: theme.palette.offwhite.main},
}));

const QuizReview = ({quiz: {questions, answeredQuestions, finalGrade}}) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div>
      {finalGrade && (
        <Typography variant="h6">
          Final Grade:
          {finalGrade}
        </Typography>
      )}
      {questions.map(({answers, id, type, statement, explanation, availablePoints}) => {
        const answeredQuestion = answeredQuestions.find(({questionId}) => questionId === id);
        const derivedAnswers = answers.map(answer => ({
          ...answer,
          isCorrect: answeredQuestion.answer.split(',').includes(answer.id),
        }));

        return (
          <div key={id}>
            <FormControl fullWidth className={classes.question}>
              <Typography variant="h5">{statement}</Typography>
              <Grid container>
                <Grid xs={type === 'essay' ? 8 : 4} className={`${classes.column}`}>
                  <Typography variant="h6">Your Answer</Typography>
                  {type !== 'essay' && <ReadOnlySelection options={derivedAnswers} type={type} />}
                  {type === 'essay' && (
                    <div>
                      <Typography>{answeredQuestion.answer || 'No answer given'}</Typography>
                      <Typography variant="h6">Here is what your professor thinks about your answer</Typography>
                      <Typography>{answeredQuestion.comment || 'No comment'}</Typography>
                      <Paper elevation={0} className={classes.peerReview}>
                        <Typography variant="h6">Here is what your peer thinks about your answer</Typography>
                        <Chip
                          color="secondary"
                          label={`${answeredQuestion.peerPoints} out of ${availablePoints} points`}
                        />
                      </Paper>
                      <Typography>{answeredQuestion.peerComment || 'No comment'}</Typography>
                    </div>
                  )}
                </Grid>
                {type !== 'essay' && (
                  <Grid xs={4} className={classes.column}>
                    <Typography variant="h6">Correct Answers</Typography>
                    <ReadOnlySelection options={answers} type={type} />
                  </Grid>
                )}
                <Grid xs={4} className={classes.column}>
                  <Typography variant="h6">Explanation</Typography>
                  <Typography>{explanation || 'No explanation provided'}</Typography>
                </Grid>
              </Grid>
            </FormControl>
            <Chip
              color="primary"
              label={`${answeredQuestion.points} out of ${availablePoints} points`}
            />
          </div>
        );
      })}
      <Button onClick={history.goBack}>Go Back</Button>
    </div>
  );
};

export default QuizReview;

import React, {Fragment} from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  Checkbox,
  Chip,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  question: {padding: '20px 0'},
  wrapper: {display: 'flex', justifyContent: 'space-between'},
  column: {display: 'flex', flexDirection: 'column', flexGrow: 1},
  disabled: {'&$disabled': {color: 'unset'}},
  big: {flexGrow: 2},
}));

const QuizReview = ({quiz}) => {
  const classes = useStyles();
  const disabledClasses = {disabled: classes.disabled};

  return (
    <Fragment>
      {quiz.questions.map(question => {
        const answeredQuestion = quiz.answeredQuestions.find(({questionId}) => questionId === question.id);
        const ControlComponent = question.type === 'singleOption' ? Radio : Checkbox;

        return (
          <Fragment key={question.id}>
            <FormControl fullWidth className={classes.question}>
              <Typography variant="h6">{question.statement}</Typography>
              <div className={classes.wrapper}>
                {question.type === 'essay'
                  ? (
                    <Fragment>
                      <div className={`${classes.column} ${classes.big}`}>
                        <Typography variant="h6">Your Answer</Typography>
                        <Typography>{answeredQuestion.answer}</Typography>
                      </div>
                      <div className={classes.column}>
                        <Typography variant="h6">Professors Comments</Typography>
                        <Typography>{answeredQuestion.comment || 'This question has no comments regarding the score.'}</Typography>
                      </div>
                    </Fragment>
                  )
                  : (
                    <Fragment>
                      <div className={classes.column}>
                        <Typography variant="h6">Your Answer</Typography>
                        {question.answers.map(answer => (
                          <FormControlLabel
                            key={answer.id}
                            checked={answeredQuestion.answer.split(',').includes(answer.id)}
                            disabled
                            classes={disabledClasses}
                            control={<ControlComponent classes={disabledClasses} />}
                            label={answer.statement}
                          />
                        ))}
                      </div>
                      <div className={classes.column}>
                        <Typography variant="h6">The Correct Answer</Typography>
                        {question.answers.map(answer => (
                          <FormControlLabel
                            key={answer.id}
                            checked={answer.isCorrect}
                            disabled
                            classes={disabledClasses}
                            control={<ControlComponent classes={disabledClasses} />}
                            label={answer.statement}
                          />
                        ))}
                      </div>
                      <div className={classes.column}>
                        <Typography variant="h6">Comments</Typography>
                        <Typography>
                          {question.answerComments || 'This question has no comments regarding the score.'}
                        </Typography>
                      </div>
                    </Fragment>
                  )}
              </div>
            </FormControl>
            <Chip color="primary" label={`${answeredQuestion.points} out of ${question.availablePoints} points`} />
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default QuizReview;

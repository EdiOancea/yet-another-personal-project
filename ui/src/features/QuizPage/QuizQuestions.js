import React, {Fragment} from 'react';
import {useMutation, useQueryClient} from 'react-query';
import {useHistory, useParams} from 'react-router';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormGroup,
  IconButton,
  Button,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Edit} from '@material-ui/icons';

import {ReadOnlySelection, DeleteIconButton} from 'components';
import api from 'utils/api';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'scroll',
  },
  addButton: {width: 'fit-content', marginTop: 'auto'},
  questions: {display: 'flex', flexDirection: 'column'},
  versions: {display: 'flex'},
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButtons: {display: 'flex'},
  noQuestions: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const QuizQuestions = ({questions = [], isReadOnly}) => {
  const classes = useStyles();
  const history = useHistory();
  const {quizId} = useParams();
  const queryClient = useQueryClient();
  const deleteQuestionMutation = useMutation(
    id => api.delete(`/quiz/${quizId}/question/${id}`),
    {onSuccess: () => queryClient.invalidateQueries(['quiz', quizId])}
  );
  const goToQuestion = (e, id = '') => {
    e.stopPropagation();

    history.push(`/quiz/${quizId}/question/${id}`);
  };
  const deleteQuestion = (e, id) => {
    e.stopPropagation();

    deleteQuestionMutation.mutate(id);
  };
  const anyQuestions = !!questions.length;

  return (
    <div className={classes.wrapper}>
      {anyQuestions
        ? (
          <Fragment>
            <div>
              {questions.map(({id, type, statement, answers, version, explanation}) => (
                <Accordion key={id}>
                  <AccordionSummary classes={{content: classes.header}}>
                    <Typography>{statement}</Typography>
                    {!isReadOnly && (
                      <div className={classes.headerButtons}>
                        <IconButton onClick={e => goToQuestion(e, id)} color="primary">
                          <Edit />
                        </IconButton>
                        <DeleteIconButton
                          isLoading={deleteQuestionMutation.isLoading}
                          onClick={e => deleteQuestion(e, id)}
                        />
                      </div>
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      <div>
                        <div className={classes.version}>
                          <Typography>Versions</Typography>
                          <ReadOnlySelection
                            options={[
                              {statement: 'A', id: 'a', isCorrect: version.includes('a')},
                              {statement: 'B', id: 'b', isCorrect: version.includes('b')},
                              {statement: 'C', id: 'c', isCorrect: version.includes('c')},
                            ]}
                            type="multipleOptions"
                          />
                        </div>
                        <div className={classes.questions}>
                          {type !== 'essay' && (
                            <Fragment>
                              <Typography>Answers</Typography>
                              <ReadOnlySelection options={answers} type={type} />
                            </Fragment>
                          )}
                          {explanation && (
                            <Fragment>
                              <Typography>Explanation</Typography>
                              {explanation}
                            </Fragment>
                          )}
                        </div>
                      </div>
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              ))}
              {questions.length === 0 && 'This quiz has no questions.'}
            </div>
            {!isReadOnly && (
              <Button
                variant="contained"
                color="primary"
                onClick={goToQuestion}
                className={classes.addButton}
              >
                Add Question
              </Button>
            )}
          </Fragment>
        )
        : (
          <div className={classes.noQuestions}>
            <Typography variant="h6">This Quiz has no questions</Typography>
            <Button variant="contained" color="primary" onClick={goToQuestion}>Add Question</Button>
          </div>
        )}
    </div>
  );
};

export default QuizQuestions;

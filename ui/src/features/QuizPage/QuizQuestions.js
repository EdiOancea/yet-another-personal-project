import React from 'react';
import {useMutation, useQueryClient} from 'react-query';
import {useHistory, useParams} from 'react-router';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  IconButton,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';

import api from 'utils/api';

const useStyles = makeStyles(() => ({
  wrapper: {display: 'flex', flexDirection: 'column', justifyContent: 'space-between'},
  addButton: {width: 'fit-content'},
  questions: {flexDirection: 'column'},
  questionGroups: {flexDirection: 'column'},
  header: {justifyContent: 'space-between'},
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

  return (
    <div className={classes.wrapper}>
      <div>
        {questions.map(({id, type, statement, answers}) => (
          <Accordion key={id}>
            <AccordionSummary classes={{content: classes.header}}>
              {statement}
              {!isReadOnly && (
                <span>
                  <EditIcon onClick={e => goToQuestion(e, id)} />
                  {deleteQuestionMutation.isLoading
                    ? <CircularProgress size={24} />
                    : <DeleteIcon onClick={e => deleteQuestion(e, id)} />}
                </span>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {answers.map(({id: answerId, statement: answer, isCorrect}) => (
                  <FormControlLabel
                    key={answerId}
                    control={<Checkbox checked={isCorrect} disabled />}
                    label={answer}
                  />
                ))}
                {type === 'essay' && 'This question has no options to choose from'}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        ))}
        {questions.length === 0 && 'This quiz has no questions.'}
      </div>
      {!isReadOnly && (
        <IconButton onClick={goToQuestion} color="primary" className={classes.addButton}>
          <AddIcon />
        </IconButton>
      )}
    </div>
  );
};

export default QuizQuestions;

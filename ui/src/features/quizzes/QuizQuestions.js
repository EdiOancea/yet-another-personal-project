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
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';

import api from 'utils/api';

const useStyles = makeStyles(() => ({
  questions: {flexDirection: 'column'},
  header: {justifyContent: 'space-between'},
}));

const QuizQuestions = ({questions}) => {
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
    <Accordion>
      <AccordionSummary classes={{content: classes.header}}>
        See Questions
        <AddIcon onClick={goToQuestion} />
      </AccordionSummary>
      <AccordionDetails classes={{root: classes.questions}}>
        {questions.map(({id, type, statement, answers}) => (
          <Accordion key={id}>
            <AccordionSummary classes={{content: classes.header}}>
              {statement}
              <span>
                <EditIcon onClick={e => goToQuestion(e, id)} />
                {deleteQuestionMutation.isLoading
                  ? <CircularProgress size={24} />
                  : <DeleteIcon onClick={e => deleteQuestion(e, id)} />}
              </span>
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
      </AccordionDetails>
    </Accordion>
  );
};

export default QuizQuestions;

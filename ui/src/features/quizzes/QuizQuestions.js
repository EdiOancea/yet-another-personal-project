import React from 'react';
import {useHistory} from 'react-router';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Edit as EditIcon, Add as AddIcon} from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  questions: {flexDirection: 'column'},
  header: {justifyContent: 'space-between'},
}));

const QuizQuestions = ({questions}) => {
  const classes = useStyles();
  const history = useHistory();
  const goToQuestion = (e, id = '') => {
    e.stopPropagation();

    history.push(`${history.location.pathname}/question/${id}`);
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
              <EditIcon onClick={e => goToQuestion(e, id)} />
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

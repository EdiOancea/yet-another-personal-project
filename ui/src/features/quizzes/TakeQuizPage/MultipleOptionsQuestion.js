import React from 'react';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import {Checkbox} from 'utils/form';

const MultipleOptionsQuestion = ({question: {statement, answers, id}}) => (
  <FormControl>
    <FormLabel>{statement}</FormLabel>
    <FormGroup>
      {answers.map(answer => (
        <FormControlLabel
          key={answer.id}
          control={<Checkbox name={`${id}.${answer.id}`} />}
          label={answer.statement}
        />
      ))}
    </FormGroup>
  </FormControl>
);

export default MultipleOptionsQuestion;

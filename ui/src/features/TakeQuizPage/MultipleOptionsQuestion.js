import React from 'react';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import {Checkbox} from 'components';

const MultipleOptionsQuestion = ({question: {statement, answers, id}, isReadOnly}) => (
  <FormControl>
    <FormLabel>{statement}</FormLabel>
    <FormGroup>
      {answers.map(answer => (
        <FormControlLabel
          key={answer.id}
          control={<Checkbox name={`${id}.${answer.id}`} />}
          label={answer.statement}
          disabled={isReadOnly}
        />
      ))}
    </FormGroup>
  </FormControl>
);

export default MultipleOptionsQuestion;

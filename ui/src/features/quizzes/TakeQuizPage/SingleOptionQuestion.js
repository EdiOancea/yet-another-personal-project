import React from 'react';

import {RadioGroup} from 'utils/form';

const SingleOptionQuestion = ({question: {statement, answers, id}}) => (
  <RadioGroup
    name={id}
    label={statement}
    options={answers.map(answer => ({value: answer.id, label: answer.statement}))}
  />
);

export default SingleOptionQuestion;

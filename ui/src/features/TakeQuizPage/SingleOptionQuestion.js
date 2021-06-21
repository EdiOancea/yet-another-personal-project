import React from 'react';

import {RadioGroup} from 'components';

const SingleOptionQuestion = ({question: {statement, answers, id}, isReadOnly}) => (
  <RadioGroup
    name={id}
    label={statement}
    options={answers.map(answer => ({value: answer.id, label: answer.statement}))}
    disabled={isReadOnly}
  />
);

export default SingleOptionQuestion;

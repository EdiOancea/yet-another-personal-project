import React, {Fragment} from 'react';
import {FormLabel} from '@material-ui/core';

import {TextField} from 'utils/form';

const EssayQuestion = ({question: {statement, id}}) => (
  <Fragment key={id}>
    <FormLabel>{statement}</FormLabel>
    <TextField
      name={id}
      label="Your Answer"
      multiline
      rows={10}
    />
  </Fragment>
);

export default EssayQuestion;

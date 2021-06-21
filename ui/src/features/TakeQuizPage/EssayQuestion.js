import React, {Fragment} from 'react';
import {FormLabel} from '@material-ui/core';

import {TextField} from 'components';

const EssayQuestion = ({question: {statement, id}, isReadOnly}) => (
  <Fragment key={id}>
    <FormLabel>{statement}</FormLabel>
    <TextField
      name={id}
      multiline
      maxRows={5}
      disabled={isReadOnly}
    />
  </Fragment>
);

export default EssayQuestion;

import React from 'react';
import {Typography} from '@material-ui/core';

import {RadioGroup, TextField} from 'utils/form';

const WhoAreYou = () => (
  <div>
    <Typography component="h1" variant="h2">
      Tell us about yourself
    </Typography>
    <TextField name="firstName" label="First Name" />
    <TextField name="lastName" label="Last Name" />
    <RadioGroup
      name="type"
      label="Type"
      options={[
        {value: 'student', label: 'Student'},
        {value: 'professor', label: 'Professor'},
      ]}
    />
  </div>
);

export default WhoAreYou;

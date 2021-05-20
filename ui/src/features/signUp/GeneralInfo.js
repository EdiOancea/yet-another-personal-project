import React from 'react';
import {Typography} from '@material-ui/core';
import {TextField} from 'utils/form';

const GeneralInfo = () => (
  <div>
    <Typography component="h1" variant="h2">
      Title
    </Typography>
    <TextField name="email" label="Email Address" />
    <TextField name="password" label="Password" type="password" />
    <TextField name="confirmPassword" label="Confirm Password" type="password" />
  </div>
);

export default GeneralInfo;

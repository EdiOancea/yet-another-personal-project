import React from 'react';
import {Field} from 'formik';
import {TextField as MUITextField} from '@material-ui/core';

const TextField = ({
  name,
  autoComplete = name,
  variant = 'outlined',
  margin = 'normal',
  fullWidth = true,
  ...rest
}) => (
  <Field name={name}>
    {({field, meta: {error = ' ', touched}}) => (
      <MUITextField
        {...{
          ...field,
          ...rest,
          variant,
          margin,
          fullWidth,
          autoComplete,
          error: touched && error !== ' ',
          helperText: error,
        }}
      />
    )}
  </Field>
);

export default TextField;

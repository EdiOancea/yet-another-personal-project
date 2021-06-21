import React from 'react';
import {useField} from 'formik';
import {TextField as MUITextField} from '@material-ui/core';

const TextField = ({
  name,
  autoComplete = name,
  variant = 'outlined',
  margin = 'normal',
  fullWidth = true,
  ...rest
}) => {
  const [field, {error = ' ', touched}] = useField({name});

  return (
    <MUITextField
      {...{
        ...field,
        ...rest,
        variant,
        margin,
        fullWidth,
        autoComplete,
        error: touched && error !== ' ',
        helperText: touched ? error : ' ',
      }}
    />
  );
};

export default TextField;

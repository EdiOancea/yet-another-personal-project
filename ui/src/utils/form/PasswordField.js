import React, {useState} from 'react';
import {InputAdornment, IconButton} from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';
import TextField from './TextField';

const PasswordField = ({InputProps = {}, enableAutoComplete, ...rest}) => {
  const [show, setShow] = useState(false);
  // const autoCompleteProps = enableAutoComplete
  //   ? {autoComplete: 'new-password', form: {autocomplete: 'off'}}
  //   : {};

  return (
    <TextField
      type={show ? 'text' : 'password'}
      inputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShow(!show)}>
              {show ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
        autoComplete: 'off',
        // ...autoCompleteProps,
        ...InputProps,
      }}
      {...rest}
    />
  );
};

export default PasswordField;

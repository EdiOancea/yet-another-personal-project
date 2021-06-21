import React, {useState} from 'react';
import {InputAdornment, IconButton} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import TextField from './TextField';

const PasswordField = ({InputProps = {}, ...rest}) => {
  const [show, setShow] = useState(false);

  return (
    <TextField
      type={show ? 'text' : 'password'}
      inputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShow(!show)}>
              {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
        autoComplete: 'off',
        ...InputProps,
      }}
      {...rest}
    />
  );
};

export default PasswordField;

import React from 'react';
import {useField} from 'formik';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';

import {Checkbox} from 'components';

const CheckboxGroup = ({name, options = [], label, disabled, row}) => {
  const [, {error, touched}] = useField(name);

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <FormGroup row={row}>
        {options.map(option => {
          const key = `${name}.${option.value}`;

          return (
            <FormControlLabel
              key={key}
              control={<Checkbox name={key} />}
              label={option.label}
              disabled={disabled}
            />
          );
        })}
      </FormGroup>
      <FormHelperText>{touched ? error : ' '}</FormHelperText>
    </FormControl>
  );
};

export default CheckboxGroup;

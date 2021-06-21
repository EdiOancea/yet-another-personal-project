import React from 'react';
import {useField} from 'formik';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup as MUIRadioGroup,
  FormHelperText,
  Radio,
} from '@material-ui/core';

const RadioGroup = ({name, options = [], label, disabled, ...rest}) => {
  const [field, {touched, error = ' '}] = useField({name});
  const isError = touched && error !== ' ';

  return (
    <FormControl error={isError}>
      <FormLabel>{label}</FormLabel>
      <MUIRadioGroup {...{...field, ...rest}}>
        {options.map(option => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio disabled={disabled} />}
            label={option.label}
          />
        ))}
      </MUIRadioGroup>
      <FormHelperText>{touched ? error : ' '}</FormHelperText>
    </FormControl>
  );
};

export default RadioGroup;

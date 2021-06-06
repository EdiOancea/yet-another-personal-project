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

const RadioGroup = ({name, options = [], label, ...rest}) => {
  const [field, {touched, error}] = useField({name});

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MUIRadioGroup {...{...field, ...rest}}>
        {options.map(option => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </MUIRadioGroup>
      {touched && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default RadioGroup;

import React from 'react';
import {useField} from 'formik';
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';

const SelectField = ({
  name,
  options = [],
  label = '',
  variant = 'outlined',
  fullWidth = true,
  ...rest
}) => {
  const [field, {error = ' '}] = useField({name});

  return (
    <FormControl variant={variant} fullWidth={fullWidth}>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        {...{
          ...field,
          ...rest,
          label,
          id: name,
          labelId: name,
        }}
      >
        {options.map(({value, label: optionLabel}) => (
          <MenuItem key={value} value={value}>
            {optionLabel}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText id={name} error={error !== ' '}>{error}</FormHelperText>
    </FormControl>
  );
};

export default SelectField;

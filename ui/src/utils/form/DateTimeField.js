import React from 'react';
import {useField} from 'formik';
import {DateTimePicker} from '@material-ui/pickers';

const DateTimePickerField = ({
  variant = 'inline',
  inputVariant = 'outlined',
  margin = 'normal',
  fullWidth = true,
  autoOk = true,
  format = 'dd/MM/yyyy hh:mm',
  defaultValue,
  label,
  name,
}) => {
  const [field, {touched, error = ' '}, {setValue}] = useField({name, defaultValue});

  return (
    <DateTimePicker
      {...{
        ...field,
        variant,
        inputVariant,
        margin,
        fullWidth,
        label,
        autoOk,
        format,
        emptyLabel: label,
        error: touched && error !== ' ',
        helperText: error,
        onChange: setValue,
      }}
    />
  );
};

export default DateTimePickerField;

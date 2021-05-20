import React, {Fragment} from 'react';
import {Field} from 'formik';
import {DateTimePicker} from '@material-ui/pickers';
import {FormHelperText} from '@material-ui/core';

const DateTimePickerField = ({
  variant = 'inline',
  inputVariant = 'outlined',
  margin = 'normal',
  fullWidth = true,
  id,
  label,
  name,
  autoOk = true,
  defaultValue,
  format = 'dd/MM/yyyy hh:mm',
}) => (
  <Field name={name} defaultValue={defaultValue}>
    {({field, meta: {touched, error}, form: {setFieldValue}}) => (
      <Fragment>
        <DateTimePicker
          {...{
            variant,
            inputVariant,
            margin,
            fullWidth,
            id,
            label,
            autoOk,
            format,
            emptyLabel: label,
            ...field,
            onChange: value => setFieldValue(name, value),
          }}
        />
        <FormHelperText id={name} error={touched && error !== ' '}>{error}</FormHelperText>
      </Fragment>

    )}
  </Field>
);

export default DateTimePickerField;

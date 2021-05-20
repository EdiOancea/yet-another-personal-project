import React, {Fragment} from 'react';
import {Field} from 'formik';
import {Select as MUISelectField, MenuItem, InputLabel, FormHelperText} from '@material-ui/core';

const SelectField = ({
  name,
  options = [],
  label = '',
  variant = 'outlined',
  fullWidth = true,
  ...rest
}) => (
  <Field name={name}>
    {({field, meta: {error = ' '}}) => (
      <Fragment>
        <InputLabel id={name}>{label}</InputLabel>
        <MUISelectField
          {...{
            ...field,
            ...rest,
            variant,
            fullWidth,
            id: name,
          }}
        >
          {options.map(({value, label: optionbLabel}) => (
            <MenuItem key={value} value={value}>
              {optionbLabel}
            </MenuItem>
          ))}
        </MUISelectField>
        <FormHelperText id={name} error={error !== ' '}>{error}</FormHelperText>
      </Fragment>
    )}
  </Field>
);

export default SelectField;

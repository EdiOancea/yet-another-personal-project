import React, {Fragment} from 'react';
import {Field} from 'formik';
import {
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup as MUIRadioGroup,
} from '@material-ui/core';

const RadioGroup = ({
  name,
  options = [],
  rest,
}) => (
  <Field name={name}>
    {({field, meta: {error = ' '}}) => (
      <Fragment>
        <MUIRadioGroup
          {...{
            ...field,
            ...rest,
          }}
        >
          {options.map(({value, label}) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={label}
            />
          ))}
        </MUIRadioGroup>
        <FormHelperText>
          {error}
        </FormHelperText>
      </Fragment>
    )}
  </Field>
);

export default RadioGroup;

import React from 'react';
import {useField} from 'formik';
import {Checkbox as MUICheckbox} from '@material-ui/core';

const Checkbox = ({name, ...rest}) => {
  const [field] = useField({type: 'checkbox', name});

  return <MUICheckbox {...{...field, ...rest}} />;
};

export default Checkbox;

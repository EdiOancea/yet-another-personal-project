import React, {Fragment} from 'react';
import {Button, FormHelperText} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {FieldArray, useFormikContext} from 'formik';

import {TextField, Checkbox, DeleteIconButton} from 'components';

const useStyles = makeStyles(() => ({
  row: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {height: 'fit-content'},
  addButton: {marginTop: 'auto', width: 'fit-content'},
}));

const DEFAULT_QUESTION = {isCorrect: false, statement: ''};

const QuizQuestionAnswersTable = ({name}) => {
  const {values: {answers}, errors} = useFormikContext();
  const classes = useStyles();

  return (
    <FieldArray name={name}>
      {arrayHelpers => (
        <Fragment>
          {answers.map((_, idx) => {
            const checkboxName = `${name}.${idx}.isCorrect`;
            const textFieldName = `${name}.${idx}.statement`;
            const onDelete = () => arrayHelpers.remove(idx);

            return (
              <div key={idx} className={classes.row}>
                <Checkbox name={checkboxName} classes={{root: classes.checkbox}} />
                <TextField name={textFieldName} label="Question option" variant="standard" />
                <DeleteIconButton onClick={onDelete} />
              </div>
            );
          })}
          {typeof errors.answers === 'string' && (
            <FormHelperText padding={10}>
              {errors.answers}
            </FormHelperText>
          )}
          <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            onClick={() => arrayHelpers.push(DEFAULT_QUESTION)}
          >
            Add Option
          </Button>
        </Fragment>
      )}
    </FieldArray>
  );
};

export default QuizQuestionAnswersTable;

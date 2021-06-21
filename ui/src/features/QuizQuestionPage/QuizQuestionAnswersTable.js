import React from 'react';
import {Button, IconButton} from '@material-ui/core';
import {Delete as DeleteIcon} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import {FieldArray, useFormikContext} from 'formik';

import {TextField, Checkbox} from 'components';

const useStyles = makeStyles(() => ({
  row: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {height: 'fit-content'},
}));

const QuizQuestionAnswersTable = ({name}) => {
  const {values: {answers}} = useFormikContext();
  const classes = useStyles();

  return (
    <FieldArray name={name}>
      {arrayHelpers => (
        <div className={classes.wrapper}>
          {answers.map((_, idx) => {
            const checkboxName = `${name}.${idx}.isCorrect`;
            const textFieldName = `${name}.${idx}.statement`;
            const onDelete = () => arrayHelpers.remove(idx);

            return (
              <div key={idx} className={classes.row}>
                <Checkbox name={checkboxName} classes={{root: classes.checkbox}} />
                <TextField name={textFieldName} label="Question option" variant="standard" />
                <IconButton onClick={onDelete} >
                  <DeleteIcon />
                </IconButton>
              </div>
            );
          })}
          <Button onClick={() => arrayHelpers.push({isCorrect: false, statement: ''})}>
            Add
          </Button>
        </div>
      )}
    </FieldArray>
  );
};

export default QuizQuestionAnswersTable;

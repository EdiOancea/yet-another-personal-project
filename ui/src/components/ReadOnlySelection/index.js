import React from 'react';
import {FormControlLabel, Radio, Checkbox} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({disabled: {'&$disabled': {color: theme.palette.gray.main}}}));

const ReadOnlySelection = ({options, type}) => {
  const classes = useStyles();
  const ControlComponent = type === 'singleOption' ? Radio : Checkbox;

  return options.map(({id, statement, isCorrect}) => (
    <FormControlLabel
      key={id}
      checked={isCorrect}
      disabled
      classes={classes}
      control={<ControlComponent classes={classes} />}
      label={statement}
    />
  ));
};

export default ReadOnlySelection;

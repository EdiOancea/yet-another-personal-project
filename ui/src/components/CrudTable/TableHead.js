import React from 'react';
import {TableHead, TableRow, TableCell, Checkbox} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  deleteButton: {width: '20px'},
  editButton: {width: '20px'},
}));

const CrudTableHead = ({selectionProps, entities, headers, onEdit, onDelete}) => {
  const classes = useStyles();
  const {onSelectAll, selected} = selectionProps || {};

  return (
    <TableHead>
      <TableRow>
        {selectionProps && (
          <TableCell padding="checkbox">
            <Checkbox
              disabled={!entities.length}
              indeterminate={![entities.length, 0].includes(selected.length)}
              checked={entities.length && selected.length === entities.length}
              onChange={onSelectAll}
            />
          </TableCell>
        )}
        {headers.map(header => <TableCell key={header}>{header}</TableCell>)}
        {onEdit && <TableCell className={classes.editButton} />}
        {onDelete && <TableCell className={classes.deleteButton} />}
      </TableRow>
    </TableHead>
  );
};

export default CrudTableHead;

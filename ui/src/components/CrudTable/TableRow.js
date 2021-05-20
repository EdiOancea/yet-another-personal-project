import React from 'react';
import {TableRow, TableCell, Checkbox, IconButton} from '@material-ui/core';
import {Delete as DeleteIcon, Edit as EditIcon} from '@material-ui/icons';

const getDeepKey = (obj, key) => key
  .split('.')
  .reduce((acc, i) => (acc || {})[i], obj) || key;

const CrudTableRow = ({entity, onDelete, onEdit, rowKeys, selectionProps}) => {
  const {selected, onSelect} = selectionProps || {};

  return (
    <TableRow key={entity.id} style={{height: 64}}>
      {selectionProps && (
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected.includes(entity.id)}
            onChange={() => onSelect(entity.id)}
          />
        </TableCell>
      )}
      {rowKeys.map(key => (
        <TableCell key={getDeepKey(entity, key)}>
          {getDeepKey(entity, key)}
        </TableCell>
      ))}
      {onEdit && (
        <TableCell>
          <IconButton onClick={() => onEdit(entity.id)}>
            <EditIcon />
          </IconButton>
        </TableCell>
      )}
      {onDelete && (
        <TableCell>
          <IconButton onClick={() => onDelete(entity.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
};

export default CrudTableRow;

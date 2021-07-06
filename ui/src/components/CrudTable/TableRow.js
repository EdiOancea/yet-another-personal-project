import React from 'react';
import {
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import {Edit} from '@material-ui/icons';

import {DeleteIconButton} from 'components';

const getDeepKey = (obj, key) => key
  .split('.')
  .reduce((acc, i) => (acc || {})[i], obj);

const CrudTableRow = ({
  entity,
  onDelete,
  onEdit,
  columns,
  selectionProps,
  isDeleting,
}) => {
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
      {columns.map(({key, render, Component}) => {
        if (typeof render === 'function') {
          return <TableCell key={key}>{render(entity)}</TableCell>;
        }

        if (typeof Component === 'function') {
          return <TableCell key={key}><Component entity={entity} /></TableCell>;
        }

        return <TableCell key={key}>{getDeepKey(entity, key)}</TableCell>;
      })}
      {onEdit && (
        <TableCell>
          <IconButton color="secondary" onClick={() => onEdit(entity)} disabled={isDeleting}>
            <Edit />
          </IconButton>
        </TableCell>
      )}
      {onDelete && (
        <TableCell>
          <DeleteIconButton onClick={() => onDelete(entity)} isLoading={isDeleting} />
        </TableCell>
      )}
    </TableRow>
  );
};

export default CrudTableRow;

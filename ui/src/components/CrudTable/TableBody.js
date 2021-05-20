import React from 'react';
import {TableBody, TableRow, TableCell} from '@material-ui/core';

import CrudTableRow from './TableRow';

const CrudTableBody = ({selectionProps, entities, rowKeys, onEdit, onDelete}) => {
  const emptyRows = Math.max(0, 5 - entities.length);

  return (
    <TableBody>
      {entities.map(entity => (
        <CrudTableRow
          key={entity.id}
          entity={entity}
          selectionProps={selectionProps}
          rowKeys={rowKeys}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      {emptyRows > 0 && (
        <TableRow style={{height: 64 * emptyRows}}>
          <TableCell colSpan={rowKeys.length} />
        </TableRow>
      )}
    </TableBody>
  );
};
export default CrudTableBody;

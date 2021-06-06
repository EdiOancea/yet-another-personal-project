import React from 'react';
import {TableBody, TableRow, TableCell} from '@material-ui/core';

import CrudTableRow from './TableRow';

const CrudTableBody = ({
  selectionProps,
  entities,
  columns,
  onEdit,
  onDelete,
  entityIdBeingDeleted,
}) => {
  const emptyRows = Math.max(0, 5 - entities.length);

  return (
    <TableBody>
      {entities.map(entity => (
        <CrudTableRow
          key={entity.id}
          entity={entity}
          selectionProps={selectionProps}
          columns={columns}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={entityIdBeingDeleted === entity.id}
        />
      ))}
      {emptyRows > 0 && (
        <TableRow style={{height: 64 * emptyRows}}>
          <TableCell colSpan={columns.length} />
        </TableRow>
      )}
    </TableBody>
  );
};
export default CrudTableBody;

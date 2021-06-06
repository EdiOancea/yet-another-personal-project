import React from 'react';
import {Table, TableContainer, Paper} from '@material-ui/core';

import TableFooter from './TableFooter';
import TableHead from './TableHead';
import TableBody from './TableBody';
import EmptyTable from './EmptyTable';

const CrudTable = ({
  columns = [],
  entities = [],
  onDelete,
  onEdit,
  entityIdBeingDeleted,
  emptyTableProps = {},
  paginationProps = null,
  selectionProps = null,
}) => (
  <TableContainer component={Paper}>
    {entities.length
      ? (
        <Table size="small">
          <TableHead
            selectionProps={selectionProps}
            entities={entities}
            columns={columns}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          <TableBody
            selectionProps={selectionProps}
            entities={entities}
            columns={columns}
            onEdit={onEdit}
            onDelete={onDelete}
            entityIdBeingDeleted={entityIdBeingDeleted}
          />
          <TableFooter paginationProps={paginationProps} />
        </Table>
      )
      : <EmptyTable {...emptyTableProps} />}

  </TableContainer>
);

export default CrudTable;

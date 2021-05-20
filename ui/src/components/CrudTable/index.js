import React from 'react';
import {Table, TableContainer, Paper} from '@material-ui/core';

import TableFooter from './TableFooter';
import TableHead from './TableHead';
import TableBody from './TableBody';

const CrudTable = ({
  headers = [],
  entities = [],
  rowKeys = [],
  onDelete,
  onEdit,
  paginationProps = null,
  selectionProps = null,
}) => (
  <TableContainer component={Paper}>
    <Table size="small">
      <TableHead
        selectionProps={selectionProps}
        entities={entities}
        headers={headers}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <TableBody
        selectionProps={selectionProps}
        entities={entities}
        rowKeys={rowKeys}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <TableFooter paginationProps={paginationProps} />
    </Table>
  </TableContainer>
);

export default CrudTable;

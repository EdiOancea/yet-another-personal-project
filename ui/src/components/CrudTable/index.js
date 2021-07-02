import React from 'react';
import {Table, TableContainer, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import TableFooter from './TableFooter';
import TableHead from './TableHead';
import TableBody from './TableBody';
import EmptyTable from './EmptyTable';

const useStyles = makeStyles(theme => ({root: {marginBottom: theme.spacing(3)}}));

const CrudTable = ({
  columns = [],
  entities = [],
  onDelete,
  onEdit,
  entityIdBeingDeleted,
  emptyTableProps = {},
  paginationProps = null,
  selectionProps = null,
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      {entities.length
        ? (
          <Table>
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
};

export default CrudTable;

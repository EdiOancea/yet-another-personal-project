import React from 'react';
import {TableFooter, TableRow, TablePagination} from '@material-ui/core';

const CrudTableFooter = ({paginationProps}) => {
  if (!paginationProps) {
    return null;
  }

  const {count, rowsPerPage, setPage, page} = paginationProps;

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          count={count}
          rowsPerPage={rowsPerPage}
          onChangePage={(_, nextPage) => setPage(nextPage)}
          page={page}
          rowsPerPageOptions={[]}
        />
      </TableRow>
    </TableFooter>
  );
};
export default CrudTableFooter;

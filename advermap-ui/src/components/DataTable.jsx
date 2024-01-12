import React from "react";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const DataTable = (props) => {
  const { columns, rows, height, onClickRow, onClickDetail, selectedRow } =
    props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const changeBgColor = (row) => {
    if (selectedRow && row.id == selectedRow.id) {
      console.log(row.id, selectedRow.id);
      return `rgb(229 231 235 / var(--tw-bg-opacity))`;
    }
    return "inherit";
  };

  return (
    <Paper>
      <TableContainer sx={{ height: height }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    sx={{ cursor: "pointer", bgcolor: changeBgColor(row) }}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    onClick={() => {
                      onClickRow(row);
                    }}
                  >
                    {columns.map((column) => {
                      if (column.id == "detail") {
                        return (
                          <TableCell key={column.id}>
                            <Button
                              sx={{ fontSize: "12px" }}
                              onClick={() => onClickDetail(row)}
                              variant="outlined"
                            >
                              {column.value}
                            </Button>
                          </TableCell>
                        );
                      }
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="left">
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  onClickRow: PropTypes.func.isRequired,
  onClickDetail: PropTypes.func.isRequired,
  selectedRow: PropTypes.any,
};
DataTable.defaultProps = {
  columns: [],
  rows: [],
  height: 440,
  onClickRow: () => {},
  onClickDetail: () => {},
  selectedRow: null,
};

export default DataTable;

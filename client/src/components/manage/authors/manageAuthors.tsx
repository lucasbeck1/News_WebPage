import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";

import { getAuthors } from "../../../services/authors/actions";
import ManageDelete from "./manageDelete";
import ManageModify from "./manageModify";
import ManageCreate from "./manageCreate";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import { Box, Button, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(18,109,162)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ManageAuthors() {
  const dispatch = useDispatch();

  useEffect(() => {
    getAuthors(dispatch);
  }, []);

  const allAuthors = useSelector((state: RootState) => state.authors);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <TableContainer component={Paper} sx={{ minHeight: 410 }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Mail</StyledTableCell>
                <StyledTableCell align="right">Admin</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allAuthors
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.mail}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.admin ? (
                        <IconButton
                          sx={{ p: 0, m: 0 }}
                          size="small"
                          aria-label="modify"
                          color="primary"
                        >
                          <CheckIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          sx={{ p: 0, m: 0 }}
                          size="small"
                          aria-label="modify"
                          color="default"
                        >
                          <ClearIcon />
                        </IconButton>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <ManageModify user={row} />
                      <ManageDelete />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <ManageCreate />
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={allAuthors.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
    </>
  );
}

export default ManageAuthors;

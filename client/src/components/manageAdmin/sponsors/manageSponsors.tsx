import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentLoader from "react-content-loader";
import { RootState } from "../../../store";

import { getApiSponsors } from "../../../services/admin/sponsors";
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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Box, Button, IconButton } from "@mui/material";

type Sponsor = {
  id: string;
  name: string;
  mail: string;
  password?: string;
};

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

function ManageSponsors() {
  const dispatch = useDispatch();

  useEffect(() => {
    getApiSponsors(dispatch);
  }, []);

  const allSponsors: Sponsor[] = useSelector(
    (state: RootState) => state.sponsors
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                <StyledTableCell align="right">Publicities</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allSponsors.length ? (
                allSponsors
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((sponsor) => (
                    <StyledTableRow
                      key={sponsor.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {sponsor.mail}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {sponsor.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">10</StyledTableCell>
                      <StyledTableCell align="right">
                        <ManageModify user={sponsor} />
                        <ManageDelete author={sponsor} />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
              ) : (
                <Alert variant="standard" severity="info">
                  <AlertTitle>Info</AlertTitle>
                  No sponsors — <strong>No data was found!</strong>
                </Alert>
              )}
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
            count={allSponsors.length}
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

export default ManageSponsors;

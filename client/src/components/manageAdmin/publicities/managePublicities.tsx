import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentLoader from "react-content-loader";

import { RootState } from "../../../store";
import { getPublicityBySponsor } from "../../../services/sponsor/publicities";

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
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";

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

function ManagePublicities() {
  const dispatch = useDispatch();

  const authorName = useSelector((state: RootState) => state.auth.name);
  const myPublicities = useSelector((state: RootState) => state.publicities);

  useEffect(() => {
    getPublicityBySponsor(dispatch, authorName);
  }, []);

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
          {myPublicities.length ? (
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Owner</StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                  <StyledTableCell align="right">Active</StyledTableCell>
                  <StyledTableCell align="right">Approved</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {myPublicities
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <StyledTableCell component="th" scope="row">
                        Computer Technology LTD
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.start.toString().slice(0, 10)} {" to "}
                        {row.finish.toString().slice(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.active.toString()}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.approved.toString()}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Modify - Delete
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell align="right">Section</StyledTableCell>
                    <StyledTableCell align="right">Create Date</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
              </Table>

              <ContentLoader
                speed={2.5}
                backgroundColor="#d4d4d4"
                foregroundColor="#898989"
                viewBox="0 0 180 70"
              >
                <rect
                  x="5"
                  y="5"
                  rx="1"
                  ry="1"
                  width="10.5rem"
                  height="0.4rem"
                />
                <rect
                  x="5"
                  y="15"
                  rx="1"
                  ry="1"
                  width="10.5rem"
                  height="0.4rem"
                />
                <rect
                  x="5"
                  y="25"
                  rx="1"
                  ry="1"
                  width="10.5rem"
                  height="0.4rem"
                />
                <rect
                  x="5"
                  y="35"
                  rx="1"
                  ry="1"
                  width="10.5rem"
                  height="0.4rem"
                />
                <rect
                  x="5"
                  y="45"
                  rx="1"
                  ry="1"
                  width="10.5rem"
                  height="0.4rem"
                />
              </ContentLoader>
            </>
          )}
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
          ADD
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={myPublicities.length || 0}
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

export default ManagePublicities;

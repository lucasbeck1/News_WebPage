import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentLoader from "react-content-loader";
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
import { all } from "axios";

type Author = {
  id: string;
  admin: boolean;
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

function ManageAuthors() {
  const dispatch = useDispatch();

  useEffect(() => {
    getAuthors(dispatch);
  }, []);

  const allAuthors: Author[] = useSelector((state: RootState) => state.authors);

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
          {allAuthors ? (
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
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
                  .map((user) => (
                    <StyledTableRow
                      key={user.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {user.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {user.mail}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {user.admin ? (
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
                        <ManageModify user={user} />
                        <ManageDelete author={user} />
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
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Mail</StyledTableCell>
                    <StyledTableCell align="right">Admin</StyledTableCell>
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
          <ManageCreate />
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={allAuthors.length || 0}
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

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import authors from "../../dataExamples/authors.json";
import articles from "../../dataExamples/articles.json";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import ManageDelete from "./manageDelete";
import ManageModify from "./manageModify";
import ManageCreate from "./manageCreate";

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

function ManageArticles() {
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
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Section</StyledTableCell>
                <StyledTableCell align="right">Create Date</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.headline}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.section}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.createdAt}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton
                        sx={{ p: 0, m: 0 }}
                        size="small"
                        aria-label="modify"
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ p: 0, m: 0 }}
                        size="small"
                        aria-label="delete"
                        color="default"
                      >
                        <DeleteIcon />
                      </IconButton>
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
          <Button
            sx={{ p: 0, m: 0 }}
            size="small"
            aria-label="modify"
            color="primary"
            variant="outlined"
            endIcon={<AddCircleIcon />}
          >
            ADD
          </Button>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={articles.length}
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

export default ManageArticles;

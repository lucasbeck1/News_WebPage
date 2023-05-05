import * as React from "react";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Rocky News
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "50vh",
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            Information and Technology articles.
          </Typography>

          <NavLink
            style={{
              textDecoration: "none",
              color: "rgba(0, 0, 0, 0.60)",
            }}
            to={`/login`}
          >
            <Typography component="p" variant="body1">
              {"Login"}
            </Typography>
          </NavLink>

          <NavLink
            style={{
              textDecoration: "none",
              color: "rgba(0, 0, 0, 0.60)",
            }}
            to={`/register`}
          >
            <Typography component="p" variant="body1">
              {"Register"}
            </Typography>
          </NavLink>

          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}

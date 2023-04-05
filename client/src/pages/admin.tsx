import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import { NavLink } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";

type optionsType = {
  section: string;
  url: string;
};

const options: optionsType[] = [
  { section: "Home", url: "/" },
  { section: "Manage", url: "/manage" },
  { section: "Metrics", url: "/metrics" },
];

const ITEM_HEIGHT = 48;

function Admin() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <ScopedCssBaseline enableColorScheme>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="relative">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  sx={{ mr: 2 }}
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  {options.map((option) => (
                    <NavLink
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={option.url}
                    >
                      <MenuItem
                        key={option.section}
                        selected={option.section === "Pyxis"}
                        onClick={handleClose}
                      >
                        {option.section}
                      </MenuItem>
                    </NavLink>
                  ))}
                </Menu>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  News
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </Box>
        </ScopedCssBaseline>
      </Container>
    </>
  );
}

export default Admin;
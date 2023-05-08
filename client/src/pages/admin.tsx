import * as React from "react";
import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import { NavLink, useNavigate } from "react-router-dom";

import { logout } from "../services/auth/actions";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { deepOrange, green } from "@mui/material/colors";

type optionsType = {
  section: string;
  url: string;
};

const options: optionsType[] = [
  { section: "Home", url: "/" },
  { section: "Manage", url: "/manage" },
  { section: "Metrics", url: "/metrics" },
];

function Admin() {
  const ITEM_HEIGHT = 48;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function logoutUser() {
    await logout();
    navigate("/");
  }

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
                <Avatar sx={{ width: 24, height: 24, p: 0, m: 0 }} alt="avatar">
                  <PersonIcon />
                </Avatar>
                <Button onClick={() => logoutUser()} color="inherit">
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
        </ScopedCssBaseline>
      </Container>
    </>
  );
}

export default Admin;

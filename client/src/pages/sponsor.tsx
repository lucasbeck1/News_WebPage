import React from "react";
import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { logoutSponsorApi } from "../services/public/auth";
import { RootState } from "../store/store";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

type optionsType = {
  section: string;
  url: string;
};

const options1: optionsType[] = [
  { section: "Home", url: "/" },
  { section: "Manage Publicities", url: "/mypublicities" },
];

function Sponsor() {
  //****************************
  // **** Global Variables ****
  //****************************

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameUser: string = useSelector((state: RootState) => state.auth.name);

  //****************************
  // **** Local Variables ****
  //****************************

  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const ITEM_HEIGHT = 48;

  //****************************
  //    **** Functions ****
  //****************************

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name: string) {
    const arrayName = name.split(" ");
    const oneWord: boolean = arrayName.length < 2;
    const avatarName = oneWord
      ? arrayName[0][0]
      : arrayName[0][0] + arrayName[1][0];

    return {
      sx: {
        width: 30,
        height: 28,
        p: 0,
        m: 0,
        bgcolor: stringToColor(name),
      },
      alt: "av",
      children: (
        <Typography
          component="p"
          sx={{ flexGrow: 1 }}
          variant="button"
          display="block"
          gutterBottom
          paddingLeft={oneWord ? 1 : 0.5}
          paddingRight={oneWord ? 0.35 : 0.35}
          paddingTop={1}
          color={"rgb(0,0,0)"}
        >
          {avatarName}
        </Typography>
      ),
    };
  }

  const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  async function logoutUser() {
    handleClose2();
    const logMessage = await logoutSponsorApi(dispatch);
    navigate("/");
    if (logMessage.message !== "Loggout Succesfull") {
      Swal.fire("Logout Error", "Please try again", "error");
    }
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
                  aria-controls={open1 ? "long-menu" : undefined}
                  aria-expanded={open1 ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick1}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl1}
                  open={open1}
                  onClose={handleClose1}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  {options1.map((option) => (
                    <NavLink
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={option.url}
                    >
                      <MenuItem
                        key={option.section}
                        selected={option.section === "section route"}
                        onClick={handleClose1}
                      >
                        {option.section}
                      </MenuItem>
                    </NavLink>
                  ))}
                </Menu>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  News
                </Typography>

                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  sx={{ mr: 2 }}
                  aria-label="more"
                  id="long-button"
                  aria-controls={open2 ? "long-menu" : undefined}
                  aria-expanded={open2 ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick2}
                >
                  {nameUser ? (
                    <Avatar {...stringAvatar(nameUser)}></Avatar>
                  ) : (
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        p: 0,
                        m: 0,
                      }}
                      alt="av"
                    />
                  )}
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl2}
                  open={open2}
                  onClose={handleClose2}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  <MenuItem onClick={logoutUser}>Logout</MenuItem>
                </Menu>
              </Toolbar>
            </AppBar>
          </Box>
        </ScopedCssBaseline>
      </Container>
    </>
  );
}

export default Sponsor;

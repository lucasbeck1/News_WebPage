import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { getSections } from "../../services/sections/actions";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();

  useEffect(() => {
    getSections(dispatch);
  }, []);

  const allSections = useSelector((state: RootState) => state.section.sections);

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          <NavLink
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/`}
          >
            Rocky News
          </NavLink>
        </Typography>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {allSections.map((section) => (
          <Typography
            key={section.name}
            color="inherit"
            noWrap
            sx={{ p: 1, flexShrink: 0 }}
          >
            <NavLink
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/${section.name}`}
            >
              {section.name}
            </NavLink>
          </Typography>
        ))}
      </Toolbar>
    </>
  );
}

export default Header;

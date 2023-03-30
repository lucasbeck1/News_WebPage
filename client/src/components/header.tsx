import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import Sections from "../dataExamples/sections.json";

function Header() {
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
          <NavLink to={`/`}>Rocky News</NavLink>
        </Typography>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {Sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section}
            variant="body2"
            href={`/#/${section}`}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section}
          </Link>
        ))}
      </Toolbar>
    </>
  );
}

export default Header;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentLoader from "react-content-loader";

import { RootState } from "../../store/store";
import { getApiSections } from "../../services/public/sections";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import CloudIcon from "@mui/icons-material/Cloud";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function Header() {
  const dispatch = useDispatch();

  useEffect(() => {
    getApiSections(dispatch);
  }, []);

  const allSections = useSelector((state: RootState) => state.sections);

  function WeatherInfo(props: { temp: string }) {
    return (
      <>
        <Typography component="h2" variant="h6" color="inherit" noWrap>
          {props.temp}
        </Typography>
        <CloudIcon style={{ color: "grey" }} />
      </>
    );
  }

  function EconomyInfo(props: { text: string; value: number }) {
    return (
      <>
        <Typography component="h2" variant="h6" color="inherit" noWrap>
          {props.text}
        </Typography>

        <p>{props.value}</p>
        <ArrowDropUpIcon style={{ color: "green" }} />
      </>
    );
  }

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <WeatherInfo temp="18°C" />
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          <NavLink style={{ textDecoration: "none", color: "inherit" }} to={`/`}>
            Rocky News
          </NavLink>
        </Typography>
        <EconomyInfo text="Market" value={2} />
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {allSections ? (
          allSections.map((section) => (
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
          ))
        ) : (
          <ContentLoader
            speed={2.5}
            backgroundColor="#d4d4d4"
            foregroundColor="#898989"
            viewBox="0 0 180 70"
          >
            <rect x="0" y="0" rx="1" ry="1" width="1rem" height="0.2rem" />
            <rect x="20" y="0" rx="1" ry="1" width="1rem" height="0.2rem" />
            <rect x="40" y="0" rx="1" ry="1" width="1rem" height="0.2rem" />
            <rect x="60" y="0" rx="1" ry="1" width="1rem" height="0.2rem" />
            <rect x="80" y="0" rx="1" ry="1" width="1rem" height="0.2rem" />
            <rect x="100" y="0" rx="1" ry="1" width="1rem" height="0.2rem" />
            <rect x="120" y="0" rx="1" ry="1" width="1rem" height="0.2rem" />
            <rect x="140" y="0" rx="1" ry="1" width="1rem" height="0.2rem" />
            <rect x="160" y="0" rx="1" ry="1" width="1rem" height="0.2rem" />
            <rect x="180" y="0" rx="1" ry="1" width="1rem" height="0.2rem" />
          </ContentLoader>
        )}
      </Toolbar>
    </>
  );
}

export default Header;

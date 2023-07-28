import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import CardArticle from "../components/public/card";
import Footer from "../components/public/footer";
import articles from "../dataExamples/articles.json";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function Metrics() {
  const typeUser = useSelector((state: RootState) => state.auth.type);

  if (!typeUser || typeUser !== "admin") {
    return <Navigate to={"/"} />;
  }

  return (
    <Container maxWidth="lg" sx={{ p: 0 }}>
      <ScopedCssBaseline enableColorScheme>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1, pt: 2 }}
        >
          Metrics
        </Typography>
        <Footer />
      </ScopedCssBaseline>
    </Container>
  );
}

export default Metrics;

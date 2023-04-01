import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import ArticleIcon from "@mui/icons-material/Article";
import FolderIcon from "@mui/icons-material/Folder";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import StoreIcon from "@mui/icons-material/Store";
import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Header from "../components/header";
import CardArticle from "../components/card";
import Footer from "../components/footer";
import articles from "../dataExamples/articles.json";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function Management() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event);
  };

  return (
    <Container maxWidth="lg" sx={{ p: 0 }}>
      <ScopedCssBaseline enableColorScheme>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
          centered
        >
          <Tab icon={<AssignmentIndIcon />} label="Authors" />
          <Tab icon={<ArticleIcon />} label="Articles" />
          <Tab icon={<FolderIcon />} label="Sections" />
          <Tab icon={<GroupIcon />} label="Sponsors" />
          <Tab icon={<StorefrontIcon />} label="Publicities" />
        </Tabs>
        <Footer />
      </ScopedCssBaseline>
    </Container>
  );
}

export default Management;

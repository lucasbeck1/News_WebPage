import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";
// @ts-ignore
import SwipeableViews from "react-swipeable-views-react-18-fix";

import Footer from "../components/public/footer";
import ManageAuthors from "../components/manageAdmin/authors/manageAuthors";
import ManageArticles from "../components/manageAdmin/articles/manageArticles";
import ManageSections from "../components/manageAdmin/sections/manageSections";
import ManageSponsors from "../components/manageAdmin/sponsors/manageSponsors";
import ManagePublicities from "../components/manageAdmin/publicities/managePublicities";

import { useTheme } from "@mui/material/styles";
import ArticleIcon from "@mui/icons-material/Article";
import FolderIcon from "@mui/icons-material/Folder";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Management() {
  const typeUser = useSelector((state: RootState) => state.auth.type);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const theme = useTheme();

  if (!typeUser || typeUser !== "admin") {
    return <Navigate to={"/"} />;
  }

  return (
    <Container maxWidth="lg" sx={{ p: 0 }}>
      <ScopedCssBaseline enableColorScheme>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab icon={<AssignmentIndIcon />} label="Authors" />
          <Tab icon={<ArticleIcon />} label="Articles" />
          <Tab icon={<FolderIcon />} label="Sections" />
          <Tab icon={<GroupIcon />} label="Sponsors" />
          <Tab icon={<StorefrontIcon />} label="Publicities" />
        </Tabs>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ManageAuthors />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <ManageArticles />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <ManageSections />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <ManageSponsors />
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <ManagePublicities />
          </TabPanel>
        </SwipeableViews>

        <Footer />
      </ScopedCssBaseline>
    </Container>
  );
}

export default Management;

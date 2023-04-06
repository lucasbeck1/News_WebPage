import React from "react";
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
import CardArticle from "../components/public/card";
import Footer from "../components/public/footer";
import articles from "../dataExamples/articles.json";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import ManageAuthors from "../components/manage/manageAuthors";
import ManageArticles from "../components/manage/manageArticles";

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const theme = useTheme();

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
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            Item Four
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            Item Five
          </TabPanel>
        </SwipeableViews>

        <Footer />
      </ScopedCssBaseline>
    </Container>
  );
}

export default Management;

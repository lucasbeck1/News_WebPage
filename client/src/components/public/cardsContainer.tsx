import CardArticle from "./card";
import CardLoader from "./cardLoader";

import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import articles from "../../dataExamples/articles.json";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

interface ArticleData {
  id: number;
  headline: string;
  drophead: string;
  body: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  author: { name: string };
  section: { name: string };
}

function CardsContainer(props: { articles: ArticleData[] }) {
  const { articles } = props;

  const load = articles.length ? true : false;

  const theme = useTheme();
  const smWith = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          pb: 4,
          pt: 4,
          pl: smWith ? 4 : 1,
          pr: smWith ? 4 : 1,
        }}
      >
        <Grid container spacing={4}>
          {load &&
            articles.map((article) => (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={article.id}>
                <CardArticle key={article.id} article={article} />
              </Grid>
            ))}
          {!load && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}

export default CardsContainer;

import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Header from "./header";
import CardArticle from "./card";
import Footer from "./footer";
import articles from "../../dataExamples/articles.json";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

interface ArticleData {
  id: number;
  headline: string;
  drophead: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  section: string;
  body: string;
}

function CardsContainer(props: { articles: ArticleData[] }) {
  const { articles } = props;

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
          {articles &&
            articles.map((article) => (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CardArticle key={article.id} article={article} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}

export default CardsContainer;

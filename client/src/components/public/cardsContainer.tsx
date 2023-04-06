import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Header from "./header";
import CardArticle from "./card";
import Footer from "./footer";
import articles from "../../dataExamples/articles.json";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

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

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Grid container spacing={4}>
          {articles &&
            articles.map((article) => (
              <Grid item xs={12}>
                <CardArticle key={article.id} article={article} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}

export default CardsContainer;

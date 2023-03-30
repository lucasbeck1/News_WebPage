import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Header from "../components/header";
import CardArticle from "../components/card";
import Footer from "../components/footer";
import articles from "../dataExamples/articles.json";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function Section() {
  const { sectionName } = useParams();
  const sectionArticles = articles.filter(
    (article) => article.section === sectionName
  );

  return (
    <>
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <ScopedCssBaseline enableColorScheme>
          <Header />
          <h1>{sectionName}</h1>
          <Box sx={{ flexGrow: 1, p: 4 }}>
            <Grid container spacing={4}>
              {sectionArticles &&
                sectionArticles.map((article) => (
                  <Grid item xs={12}>
                    <CardArticle key={article.id} article={article} />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </ScopedCssBaseline>
      </Container>
    </>
  );
}

export default Section;

import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Header from "../components/header";
import CardArticle from "../components/card";
import Footer from "../components/footer";
import articles from "../dataExamples/articles.json";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function Home() {
  return (
    <>
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <ScopedCssBaseline enableColorScheme>
          <Header />

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

          <Footer />
        </ScopedCssBaseline>
      </Container>
    </>
  );
}

export default Home;

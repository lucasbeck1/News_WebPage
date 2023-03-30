import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Header from "../components/header";
import CardArticle from "../components/card";
import Footer from "../components/footer";
import articles from "../dataExamples/articles.json";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardsContainer from "../components/cardsContainer";

function Home() {
  return (
    <>
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <ScopedCssBaseline enableColorScheme>
          <Header />
          <CardsContainer articles={articles} />
          <Footer />
        </ScopedCssBaseline>
      </Container>
    </>
  );
}

export default Home;

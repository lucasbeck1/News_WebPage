import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Header from "../components/public/header";
import CardArticle from "../components/public/card";
import Footer from "../components/public/footer";
import articles from "../dataExamples/articles.json";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardsContainer from "../components/public/cardsContainer";

function Section() {
  const { sectionName } = useParams();
  const sectionArticles = articles.filter(
    (article) => article.section.name === sectionName
  );

  return (
    <>
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <ScopedCssBaseline enableColorScheme>
          <Header />
          <h1>{sectionName}</h1>
          <CardsContainer articles={sectionArticles} />
          <Footer />
        </ScopedCssBaseline>
      </Container>
    </>
  );
}

export default Section;

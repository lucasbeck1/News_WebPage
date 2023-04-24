import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/public/header";
import Footer from "../components/public/footer";
import CardsContainer from "../components/public/cardsContainer";
import { getArticles } from "../services/articles/actions";
import { RootState } from "../store";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function Section() {
  const dispatch = useDispatch();
  const allArticles = useSelector((state: RootState) => state.articles);

  if (!allArticles.length) {
    useEffect(() => {
      getArticles(dispatch);
    }, []);
  }

  const { sectionName } = useParams();

  const sectionArticles = allArticles.filter(
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

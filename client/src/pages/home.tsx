import { useEffect } from "react";
import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Header from "../components/public/header";
import CardArticle from "../components/public/card";
import Footer from "../components/public/footer";
import articles from "../dataExamples/articles.json";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardsContainer from "../components/public/cardsContainer";
import CarouselContainer from "../components/public/carouselContainer";
import Swip from "../components/public/swipeableContainer";
import { getAllArticles } from "../services/articles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    getAllArticles(dispatch);
  }, []);

  const AllArticles = useSelector((state: RootState) => state.article.articles);

  return (
    <>
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <ScopedCssBaseline enableColorScheme>
          <Header />
          <CardsContainer articles={AllArticles} />
          <CarouselContainer />
          <hr />
          <Swip />
          <hr />
          <Footer />
        </ScopedCssBaseline>
      </Container>
    </>
  );
}

export default Home;

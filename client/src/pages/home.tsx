import { useEffect } from "react";
import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Header from "../components/public/header";
import Footer from "../components/public/footer";
import CardsContainer from "../components/public/cardsContainer";
import CarouselContainer from "../components/public/carouselContainer";
import Swip from "../components/public/swipeableContainer";
import { getArticles } from "../services/articles/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    getArticles(dispatch);
  }, []);

  const allArticles = useSelector((state: RootState) => state.articles);

  return (
    <>
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <ScopedCssBaseline enableColorScheme>
          <Header />
          <CardsContainer articles={allArticles} />
          <hr />
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

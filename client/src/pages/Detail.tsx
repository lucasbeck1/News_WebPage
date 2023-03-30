import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Header from "../components/header";
import CardArticle from "../components/card";
import Footer from "../components/footer";
import articles from "../dataExamples/articles.json";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const selectedArricle = articles.find(
    (article) => article.id.toString() === id
  );

  return (
    <>
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <ScopedCssBaseline enableColorScheme>
          <Header />
          <h1>{selectedArricle?.headline}</h1>
          <img src={selectedArricle?.image} alt="article loading" />
          <h4>{selectedArricle?.drophead}</h4>
          <p>{selectedArricle?.createdAt}</p>
          <p>By {selectedArricle?.author}</p>
          <p>{selectedArricle?.body}</p>
          <p>
            This article was updated lastime on {selectedArricle?.updatedAt}
          </p>
          <Footer />
        </ScopedCssBaseline>
      </Container>
    </>
  );
}

export default Detail;

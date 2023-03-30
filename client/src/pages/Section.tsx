import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Header from "../components/header";
import CardArticle from "../components/card";
import Footer from "../components/footer";
import articles from "../dataExamples/articles.json";
import { useParams } from "react-router-dom";

function Section() {
  const { sectionName } = useParams();
  const sectionArticles = articles.filter(
    (article) => article.section === sectionName
  );

  return (
    <>
      <Container maxWidth="lg">
        <ScopedCssBaseline enableColorScheme>
          <Header />
          <h1>{sectionName}</h1>
          {sectionArticles &&
            sectionArticles.map((article) => <CardArticle article={article} />)}
          <Footer />
        </ScopedCssBaseline>
      </Container>
    </>
  );
}

export default Section;

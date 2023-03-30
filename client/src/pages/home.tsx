import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Header from "../components/header";
import CardArticle from "../components/card";
import Footer from "../components/footer";
import articles from "../dataExamples/articles.json";

function Home() {
  return (
    <>
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <ScopedCssBaseline enableColorScheme>
          <Header />
          {articles &&
            articles.map((article) => <CardArticle article={article} />)}
          <Footer />
        </ScopedCssBaseline>
      </Container>
    </>
  );
}

export default Home;

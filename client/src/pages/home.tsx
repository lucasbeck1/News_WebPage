import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Header from "../components/header";
import CardArticle from "../components/card";
import Footer from "../components/footer";
import articles from "../dataExamples/articles.json";

const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
];

function Home() {
  return (
    <>
      <Container maxWidth="lg">
        <ScopedCssBaseline enableColorScheme>
          <Header sections={sections} />
          {articles &&
            articles.map((article) => <CardArticle article={article} />)}
          <Footer />
        </ScopedCssBaseline>
      </Container>
    </>
  );
}

export default Home;

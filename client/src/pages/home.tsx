import Container from "@mui/material/Container";
import Header from "../components/header";
import CardArticle from "../components/card";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";

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
          <CardArticle />
        </ScopedCssBaseline>
      </Container>
    </>
  );
}

export default Home;

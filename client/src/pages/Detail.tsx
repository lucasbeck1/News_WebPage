import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Header from "../components/header";
import Footer from "../components/footer";
import articles from "../dataExamples/articles.json";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";

function Detail() {
  const { id } = useParams();
  const selectedArricle = articles.find(
    (article) => article.id.toString() === id
  );

  const articleModify: boolean =
    selectedArricle?.updatedAt !== selectedArricle?.createdAt ? true : false;

  return (
    <>
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <ScopedCssBaseline enableColorScheme>
          <Header />

          <Box sx={{ flexGrow: 1, pt: 2, pb: 2, pl: 4, pr: 4 }}>
            <h1>{selectedArricle?.headline}</h1>
            <h4>{selectedArricle?.drophead}</h4>
            <img
              src={selectedArricle?.image}
              alt="article loading"
              width={"100%"}
              style={{ objectFit: "contain", maxHeight: "20rem" }}
            />
            <p>{selectedArricle?.body}</p>
            <p style={{ display: "flex", justifyContent: "flex-start" }}>
              {articleModify
                ? `(Updated) ${selectedArricle?.updatedAt}`
                : selectedArricle?.createdAt}{" "}
              By {selectedArricle?.author}
            </p>
          </Box>

          <Footer />
        </ScopedCssBaseline>
      </Container>
    </>
  );
}

export default Detail;

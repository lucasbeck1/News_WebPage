import { useEffect } from "react";
import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Header from "../components/public/header";
import Footer from "../components/public/footer";
import articles from "../dataExamples/articles.json";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { getArticles } from "../services/articles/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

function Detail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    getArticles(dispatch);
  }, []);

  const AllArticles = useSelector((state: RootState) => state.articles);

  const selectedArricle = AllArticles.find(
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
              style={{
                objectFit: "contain",
                maxHeight: "20rem",
                backgroundColor: "#dfdfdf",
                borderRadius: 5,
              }}
            />
            <p>{selectedArricle?.body}</p>
            <p style={{ display: "flex", justifyContent: "flex-start" }}>
              {articleModify
                ? `(Updated) ${selectedArricle?.updatedAt}`
                : selectedArricle?.createdAt.slice(0, 10)}{" "}
              By {selectedArricle?.author.name}
            </p>
          </Box>

          <Footer />
        </ScopedCssBaseline>
      </Container>
    </>
  );
}

export default Detail;

import axios from "axios";
import articles from "../dataExamples/articles.json";
import { getArticles } from "../reducers/sliceArticles";
import { AppDispatch } from "../store";

interface Article {
  id: number;
  headline: string;
  drophead: string;
  body: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  author: { name: string };
  section: { name: string };
}

/* async function getAllArticles(dispatch: AppDispatch) {
  const art: Article[] = (await axios.get("http://localhost:3001/articles"))
    .data;
  dispatch(getArticles(art));
}
 */

function getAllArticles(dispatch: AppDispatch) {
  axios
    .get("http://localhost:3001/articles")
    .then((arts) => {
      dispatch(getArticles(arts.data));
    })
    .catch((error) => {
      dispatch(getArticles(articles));
    });
}

export { getAllArticles };

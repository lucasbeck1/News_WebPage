import axios from "axios";
import articles from "../dataExamples/articles.json";
import { getArticles } from "../reducers/sliceArticles";
import { AppDispatch } from "../store";
import { localhost } from "./url";

function getAllArticles(dispatch: AppDispatch) {
  axios
    .get(localhost + "/articles")
    .then((arts) => {
      dispatch(getArticles(arts.data));
    })
    .catch((error) => {
      dispatch(getArticles(articles));
    });
}

export { getAllArticles };

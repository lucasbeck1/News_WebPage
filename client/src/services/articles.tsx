import axios from "axios";
import articles from "../dataExamples/articles.json";
import { storeArticles } from "../reducers/sliceArticles";
import { AppDispatch } from "../store";
import { localhost } from "./url";

type Article = {
  id: number;
  headline: string;
  drophead: string;
  body: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  author: { name: string };
  section: { name: string };
};

function apiArticles(
  dispatch: AppDispatch
): Promise<{ payload: Article[]; type: "article/storeArticles" }> {
  let art = axios
    .get(localhost + "/articles")
    .then((arts) => {
      return dispatch(storeArticles(arts.data));
    })
    .catch((error) => {
      return dispatch(storeArticles(articles));
    });
  return art;
}

export { apiArticles };

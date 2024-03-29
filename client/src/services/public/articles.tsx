import axios from "axios";
import { domain } from "../url";
import { storeArticles } from "../../store/reducers/sliceArticles";
import { AppDispatch } from "../../store/store";

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

function getApiArticles(dispatch: AppDispatch): Promise<{
  payload: Article[];
  type: "articles/storeArticles";
}> {
  const request = axios.get(domain + "/public/articles?page=0").then((req) => {
    return dispatch(storeArticles(req.data));
  });

  return request;
}

export { getApiArticles };

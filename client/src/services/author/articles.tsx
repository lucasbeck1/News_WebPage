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

type ArticleCreation = {
  headline: string;
  drophead: string;
  body: string;
  image: string;
  author: string;
  section: string;
};

type dataUpdate = {
  headline?: string;
  drophead?: string;
  body?: string;
  image?: string;
  section?: string;
};

axios.defaults.withCredentials = true;

function getApiArticles(
  dispatch: AppDispatch,
  name: string
): Promise<{
  payload: Article[];
  type: "articles/storeArticles";
}> {
  const request: Promise<{
    payload: Article[];
    type: "articles/storeArticles";
  }> = axios
    .get(domain + "/author/articles/author?page=0&name=" + encodeURI(name))
    .then((res) => {
      return dispatch(storeArticles(res.data));
    });
  return request;
}

function createApiArticle(data: ArticleCreation): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .post(domain + "/author/articles", data, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return { message: "REQUEST ERROR" };
    });
  return request;
}

function updateApiArticle(
  data: dataUpdate,
  id: number
): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .put(domain + "/author/articles/" + id.toString(), data, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return { message: "REQUEST ERROR" };
    });
  return request;
}

function deleteApiArticle(id: number): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .delete(domain + "/author/articles/" + id.toString(), {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return { message: "REQUEST ERROR" };
    });
  return request;
}

export { getApiArticles, createApiArticle, updateApiArticle, deleteApiArticle };

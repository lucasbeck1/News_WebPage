import { storeArticles } from "../../reducers/sliceArticles";
import { AppDispatch } from "../../store";
import {
  getApiArticles,
  createApiArticle,
  updateApiArticle,
  deleteApiArticle,
} from "./api";

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

async function getArticles(dispatch: AppDispatch): Promise<{
  payload: Article[];
  type: "articles/storeArticles";
}> {
  let getArts: Article[] = await getApiArticles();
  return dispatch(storeArticles(getArts));
}

async function createArticle(
  data: ArticleCreation
): Promise<{ message: string }> {
  let createArt: { message: string } = await createApiArticle(data);
  return createArt;
}

async function updateArticle(
  data: dataUpdate,
  id: number
): Promise<{ message: string }> {
  let createArt: { message: string } = await updateApiArticle(data, id);
  return createArt;
}

async function deleteArticle(id: number): Promise<{ message: string }> {
  let createArt: { message: string } = await deleteApiArticle(id);
  return createArt;
}

export { getArticles, createArticle, updateArticle, deleteArticle };

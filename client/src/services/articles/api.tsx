import axios from "axios";
import { localhost } from "../url";

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

function getApiArticles(): Promise<Article[]> {
  const request: Promise<Article[]> = axios
    .get(localhost + "/articles")
    .then((req) => {
      return req.data;
    })
    .catch(() => {
      return [];
    });
  return request;
}

function createApiArticle(data: ArticleCreation): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .post(localhost + "/articles", data)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return { message: "REQUEST ERROR" };
    });
  return request;
}

export { getApiArticles, createApiArticle };

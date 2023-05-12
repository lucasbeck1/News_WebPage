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

type dataUpdate = {
  headline?: string;
  drophead?: string;
  body?: string;
  image?: string;
  section?: string;
};

function getApiArticles(): Promise<Article[]> {
  const request: Promise<Article[]> = axios
    .get(localhost + "/public/articles")
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
    .post(localhost + "/admin/articles", data, {
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
    .put(localhost + "/admin/articles/" + id.toString(), data, {
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
    .delete(localhost + "/admin/articles/" + id.toString(), {
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

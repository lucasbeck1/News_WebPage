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

function getApiArticles(): Promise<Article[]> {
  const request: Promise<Article[]> = axios
    .get(localhost + "/articles")
    .then((req) => {
      return req.data;
    });
  return request;
}

export { getApiArticles };

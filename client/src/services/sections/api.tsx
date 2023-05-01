import axios from "axios";
import { localhost } from "../url";

type Section = {
  id: number;
  name: string;
  quantity: number;
};

function getApiSections(): Promise<Section[]> {
  const request: Promise<Section[]> = axios
    .get(localhost + "/sections")
    .then((req) => {
      return req.data;
    })
    .catch(() => {
      return [];
    });
  return request;
}

function createApiSection(data: string): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .post(localhost + "/section", data)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return { message: "REQUEST ERROR" };
    });
  return request;
}

function updateApiArticle(
  id: number,
  name: string
): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .put(localhost + "/section/" + id.toString(), { name })
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
    .delete(localhost + "/section/" + id.toString())
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return { message: "REQUEST ERROR" };
    });
  return request;
}

export { getApiSections, createApiSection, updateApiArticle, deleteApiArticle };

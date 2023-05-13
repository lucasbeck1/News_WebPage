import axios from "axios";
import { localhost } from "../url";
import { storeSections } from "../../reducers/sliceSections";
import { AppDispatch } from "../../store";

type Section = {
  id: number;
  name: string;
  quantity: number;
};

function getApiSections(dispatch: AppDispatch): Promise<{
  payload: Section[];
  type: "sections/storeSections";
}> {
  const request = axios.get(localhost + "/public/sections").then((req) => {
    return dispatch(storeSections(req.data));
  });
  return request;
}

function createApiSection(data: string): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .post(localhost + "/admin/sections", { name: data })
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
    .put(localhost + "/admin/sections/" + id.toString(), { name })
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
    .delete(localhost + "/admin/sections/" + id.toString())
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return { message: "REQUEST ERROR" };
    });
  return request;
}

export { getApiSections, createApiSection, updateApiArticle, deleteApiArticle };

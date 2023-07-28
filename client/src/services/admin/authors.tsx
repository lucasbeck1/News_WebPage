import axios from "axios";
import { domain } from "../url";
import { storeAuthors } from "../../store/reducers/sliceUsers";
import { AppDispatch } from "../../store/store";

type Author = {
  id: string;
  admin: boolean;
  name: string;
  mail: string;
  password?: string;
};

type authorCreation = {
  name: string;
  mail: string;
  password: string;
  admin?: boolean;
};

type authorUpdate = {
  id: string;
  admin?: boolean;
  name?: string;
  mail?: string;
  oldPassword?: string;
  newPassword?: string;
};

function getApiAuthors(dispatch: AppDispatch): Promise<{
  payload: Author[];
  type: "authors/storeAuthors";
}> {
  const request = axios
    .get(domain + "/admin/authors", {
      withCredentials: true,
    })
    .then((req) => {
      return dispatch(storeAuthors(req.data));
    });

  return request;
}

function createApiAuthor(data: authorCreation): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .post(domain + "/admin/authors", data, {
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

function updateApiAuthor(data: authorUpdate): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .put(domain + "/admin/authors/" + data.id.toString(), data, {
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

function deleteApiAuthor(id: string): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios({
    method: "delete",
    url: domain + "/admin/authors/" + id,
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

export { getApiAuthors, createApiAuthor, updateApiAuthor, deleteApiAuthor };

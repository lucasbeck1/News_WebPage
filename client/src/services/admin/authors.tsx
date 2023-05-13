import axios from "axios";
import { localhost } from "../url";
import { storeAuthors } from "../../reducers/sliceUsers";
import { AppDispatch } from "../../store";

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
    .get(localhost + "/admin/authors", {
      withCredentials: true,
    })
    .then((req) => {
      return dispatch(storeAuthors(req.data));
    });

  return request;
}

function createApiAuthor(data: authorCreation): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .post(localhost + "/admin/authors", data, {
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
    .put(localhost + "/admin/authors/" + data.id.toString(), data, {
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
    url: localhost + "/admin/authors/" + id,
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

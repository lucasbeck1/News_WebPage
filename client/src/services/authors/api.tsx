import axios from "axios";
import { localhost } from "../url";

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

function getApiAuthors(): Promise<Author[]> {
  const request: Promise<Author[]> = axios
    .get(localhost + "/admin/authors", {
      withCredentials: true,
    })
    .then((req) => {
      return req.data;
    })
    .catch(() => {
      return [];
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

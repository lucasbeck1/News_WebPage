import axios from "axios";
import { localhost } from "../url";

type loginRequest = {
  mail: string;
  password: string;
};

type registerRequest = {
  name: string;
  mail: string;
  password: string;
};

// axios.defaults.withCredentials = true;

function loginApi(data: loginRequest): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .post(localhost + "/auth/login", data, {
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

function logoutApi(): Promise<number> {
  const request: Promise<number> = axios
    .get(localhost + "/auth/logout")
    .then((req) => {
      return req.status;
    });
  return request;
}

function registerApi(data: registerRequest): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .post(localhost + "/auth/register", data)
    .then((req) => {
      return req.data;
    })
    .catch(() => {
      return [];
    });
  return request;
}

export { loginApi, logoutApi, registerApi };

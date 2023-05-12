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
    .post(localhost + "/public/auth/login", data, {
      withCredentials: true,
    })
    .then((req) => {
      return req.data;
    })
    .catch(() => {
      return { message: "Invalid credentials" };
    });
  return request;
}

function logoutApi(): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .get(localhost + "/public/auth/logout", {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
  return request;
}

function registerApi(data: registerRequest): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .post(localhost + "/public/auth/register", data)
    .then((req) => {
      return req.data;
    })
    .catch(() => {
      return [];
    });
  return request;
}

export { loginApi, logoutApi, registerApi };

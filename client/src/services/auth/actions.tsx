import { loginApi, logoutApi, registerApi } from "./api";

type loginRequest = {
  mail: string;
  password: string;
};

type registerRequest = {
  name: string;
  mail: string;
  password: string;
};

async function login(data: loginRequest): Promise<{ message: string }> {
  let request: { message: string } = await loginApi(data);
  return request;
}

async function logout(): Promise<number> {
  let request: number = await logoutApi();
  return request;
}

async function register(data: registerRequest): Promise<{ message: string }> {
  let request: { message: string } = await registerApi(data);
  return request;
}

export { login, logout, register };

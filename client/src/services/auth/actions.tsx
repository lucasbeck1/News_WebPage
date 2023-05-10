import { loginApi, logoutApi, registerApi } from "./api";
import { authState } from "../../reducers/sliceAuth";
import { AppDispatch } from "../../store";

type loginRequest = {
  mail: string;
  password: string;
};

type registerRequest = {
  name: string;
  mail: string;
  password: string;
};

async function login(
  data: loginRequest,
  dispatch: AppDispatch
): Promise<{ message: string }> {
  let request: { message: string } = await loginApi(data);

  const cookies: string = document.cookie;
  if (cookies.includes("admin=true")) {
    dispatch(authState("admin"));
  } else if (cookies.includes("admin=false")) {
    dispatch(authState("author"));
  } else {
    dispatch(authState("none"));
  }

  return request;
}

async function logout(dispatch: AppDispatch): Promise<number> {
  let request: number = await logoutApi();

  const cookies: string = document.cookie;
  if (cookies.includes("admin=true")) {
    dispatch(authState("admin"));
  } else if (cookies.includes("admin=false")) {
    dispatch(authState("author"));
  } else {
    dispatch(authState("none"));
  }

  return request;
}

async function register(data: registerRequest): Promise<{ message: string }> {
  let request: { message: string } = await registerApi(data);
  return request;
}

export { login, logout, register };

import { loginApi, logoutApi, registerApi } from "./api";
import { authState, clearState } from "../../reducers/sliceAuth";
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

function checkCredentials(dispatch: AppDispatch): void {
  const cookies: string = document.cookie;
  const nameEncoded = cookies?.split("; ").find((e) => e.includes("name"));

  if (cookies.includes("admin=true") && nameEncoded) {
    const name = decodeURI(nameEncoded.split("=")[1]);
    dispatch(authState({ type: "admin", name }));
  } else if (cookies.includes("admin=false") && nameEncoded) {
    const name = decodeURI(nameEncoded.split("=")[1]);
    dispatch(authState({ type: "author", name }));
  } else {
    dispatch(clearState());
  }
}

async function login(
  data: loginRequest,
  dispatch: AppDispatch
): Promise<{ message: string }> {
  let request: { message: string } = await loginApi(data);

  checkCredentials(dispatch);

  return request;
}

async function logout(dispatch: AppDispatch): Promise<{ message: string }> {
  let request: { message: string } = await logoutApi();
  dispatch(clearState());
  return request;
}

async function register(data: registerRequest): Promise<{ message: string }> {
  let request: { message: string } = await registerApi(data);
  return request;
}

export { login, logout, register, checkCredentials };

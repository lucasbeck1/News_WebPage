import { authState, clearState } from "../../reducers/sliceAuth";
import { AppDispatch } from "../../store";
import axios from "axios";
import { domain } from "../url";

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

function loginApi(
  data: loginRequest,
  dispatch: AppDispatch
): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .post(domain + "/public/auth/login", data, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .then((resData) => {
      checkCredentials(dispatch);
      return resData;
    })
    .catch(() => {
      return { message: "Invalid credentials" };
    });
  return request;
}

function logoutApi(dispatch: AppDispatch): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .get(domain + "/public/auth/logout", {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .then((resData) => {
      dispatch(clearState());
      return resData;
    });

  return request;
}

function registerApi(data: registerRequest): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .post(domain + "/public/auth/register", data)
    .then((req) => {
      return req.data;
    });
  return request;
}

export { loginApi, logoutApi, registerApi, checkCredentials };

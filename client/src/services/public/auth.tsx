import { authState, clearState } from "../../store/reducers/sliceAuth";
import { AppDispatch } from "../../store/store";
import axios from "axios";
import { domain } from "../url";

type dataRequest = {
  mail: string;
  password: string;
};

type loginRequest = {
  username: string;
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
  } else if (cookies.includes("sponsor=true") && nameEncoded) {
    const name = decodeURI(nameEncoded.split("=")[1]);
    dispatch(authState({ type: "sponsor", name }));
  } else {
    dispatch(clearState());
  }
}

function loginApi(
  data: dataRequest,
  dispatch: AppDispatch
): Promise<{ message: string }> {
  const credentials: loginRequest = {
    username: data.mail,
    mail: data.mail,
    password: data.password,
  };
  const request: Promise<{ message: string }> = axios
    .post(domain + "/public/auth/login", credentials, {
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

function loginSponsorApi(
  data: dataRequest,
  dispatch: AppDispatch
): Promise<{ message: string }> {
  const credentials: loginRequest = {
    username: data.mail,
    mail: data.mail,
    password: data.password,
  };
  const request: Promise<{ message: string }> = axios
    .post(domain + "/public/auth/loginSponsor", credentials, {
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

function registerSponsorApi(data: registerRequest): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .post(domain + "/public/auth/registerSponsor", data)
    .then((req) => {
      return req.data;
    });
  return request;
}

function logoutSponsorApi(dispatch: AppDispatch): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .get(domain + "/public/auth/logoutSponsor", {
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

export {
  loginApi,
  logoutApi,
  loginSponsorApi,
  logoutSponsorApi,
  registerSponsorApi,
  checkCredentials,
};

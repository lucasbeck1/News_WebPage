import axios from "axios";
import { domain } from "../url";
import { storePublicities } from "../../reducers/slicePublicities";
import { AppDispatch } from "../../store";

type Publicity = {
  id: number;
  image: string;
  active: boolean;
  finished: boolean;
  approved: boolean;
  payment: JSON;
  start: Date;
  finish: Date;
};

type PublictyCreation = {
  name: string;
  image: string;
  start: string;
  finish: string;
};

type PublictyUpdate = {
  image?: string;
  active?: boolean;
};

axios.defaults.withCredentials = true;

function getAllPublicities(dispatch: AppDispatch): Promise<{
  payload: Publicity[];
  type: "publicities/storePublicities";
}> {
  const request: Promise<{
    payload: Publicity[];
    type: "publicities/storePublicities";
  }> = axios.get(domain + "/admin/publicities" + "?page=0").then((res) => {
    return dispatch(storePublicities(res.data));
  });
  return request;
}

function createApiPublicity(
  data: PublictyCreation
): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .post(
      domain + "/admin/publicities",
      { ...data, payment: {} },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return { message: "REQUEST ERROR" };
    });
  return request;
}

function updateApiPublicity(
  data: PublictyUpdate,
  id: number
): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .put(domain + "/admin/publicities/" + id.toString(), data, {
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

function deleteApiPublicity(id: number): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .delete(domain + "/admin/publicities/" + id.toString(), {
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

export {
  getAllPublicities,
  createApiPublicity,
  updateApiPublicity,
  deleteApiPublicity,
};

import axios from "axios";
import { domain } from "../url";
import { storePublicities } from "../../store/reducers/slicePublicities";
import { AppDispatch } from "../../store/store";

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

function getPublicityBySponsor(
  dispatch: AppDispatch,
  name: string
): Promise<{
  payload: Publicity[];
  type: "publicities/storePublicities";
}> {
  const request: Promise<{
    payload: Publicity[];
    type: "publicities/storePublicities";
  }> = axios
    .get(domain + "/sponsor/publicities/" + encodeURI(name) + "?page=0")
    .then((res) => {
      return dispatch(storePublicities(res.data));
    });
  return request;
}

function createApiPublicity(
  data: PublictyCreation
): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .post(
      domain + "/sponsor/publicities",
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
    .put(domain + "/sponsor/publicities/" + id.toString(), data, {
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
    .delete(domain + "/sponsor/publicities/" + id.toString(), {
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
  getPublicityBySponsor,
  createApiPublicity,
  updateApiPublicity,
  deleteApiPublicity,
};

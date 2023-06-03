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
  image: string;
  payment: JSON;
  start: Date;
  finish: Date;
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
    .post(domain + "/author/articles", data, {
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

export { getPublicityBySponsor, createApiPublicity };

import axios from "axios";
import { domain } from "../url";
import { storeSections } from "../../reducers/sliceSections";
import { AppDispatch } from "../../store";

type Section = {
  id: number;
  name: string;
  quantity: number;
};

function getApiSections(dispatch: AppDispatch): Promise<{
  payload: Section[];
  type: "sections/storeSections";
}> {
  const request = axios.get(domain + "/public/sections").then((res) => {
    return dispatch(storeSections(res.data));
  });
  return request;
}

export { getApiSections };

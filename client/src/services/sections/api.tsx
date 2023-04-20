import axios from "axios";
import { localhost } from "../url";

type Section = {
  id: number;
  name: string;
  quantity: number;
};

function getApiSections(): Promise<Section[]> {
  const request: Promise<Section[]> = axios
    .get(localhost + "/sections")
    .then((req) => {
      return req.data;
    })
    .catch(() => {
      return [];
    });
  return request;
}

export { getApiSections };

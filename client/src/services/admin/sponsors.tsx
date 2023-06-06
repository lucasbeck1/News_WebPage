import axios from "axios";
import { domain } from "../url";
import { storeSponsors } from "../../reducers/sliceSponsors";
import { AppDispatch } from "../../store";

type Sponsor = {
  id: string;
  name: string;
  mail: string;
};

type SponsorCreate = {
  name: string;
  mail: string;
  password: string;
};

type SponsorUpdate = {
  name?: string;
  mail?: string;
  password?: string;
};

function getApiSponsors(dispatch: AppDispatch): Promise<{
  payload: Sponsor[];
  type: "sponsors/storeSponsors";
}> {
  const request = axios
    .get(domain + "/admin/sponsors?page=0", {
      withCredentials: true,
    })
    .then((req) => {
      return dispatch(storeSponsors(req.data));
    });

  return request;
}

function createApiSponsor(data: SponsorCreate): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .post(domain + "/author/sponsors", data, {
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

function updateApiSponsor(
  data: SponsorUpdate,
  id: string
): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .put(domain + "/author/sponsors/" + id, data, {
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

function deleteApiSponsor(id: string): Promise<{ message: string }> {
  const request: Promise<{ message: string }> = axios
    .delete(domain + "/author/sponsors/" + id, {
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

export { getApiSponsors, createApiSponsor, updateApiSponsor, deleteApiSponsor };

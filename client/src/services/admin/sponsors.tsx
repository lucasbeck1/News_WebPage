import axios from "axios";
import { domain } from "../url";
import { storeSponsors } from "../../reducers/sliceSponsors";
import { AppDispatch } from "../../store";

type Sponsor = {
  id: string;
  name: string;
  mail: string;
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

export { getApiSponsors };

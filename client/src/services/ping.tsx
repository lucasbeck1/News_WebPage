import axios from "axios";
import { domain } from "./url";

function apiStatus() {
  axios
    .get(domain + "/status")
    .then(() => {
      return "Connection Success";
    })
    .catch(() => {
      return "Connection Failure";
    });
}

export { apiStatus };

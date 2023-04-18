import axios from "axios";
import { localhost } from "./url";

function apiStatus() {
  axios
    .get(localhost + "/status")
    .then(() => {
      return "Connection Success";
    })
    .catch(() => {
      return "Connection Failure";
    });
}

export { apiStatus };

import axios from "axios";
import { localhost } from "../url";

function uploadApiImage(
  formData: FormData
): Promise<{ message: string; fileName: string }> {
  const data = formData;

  const request: Promise<{ message: string; fileName: string }> = axios
    .post(localhost + "/admin/images", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
    .then((info) => {
      return info.data;
    })
    .catch((error) => {
      return { message: error };
    });

  return request;
}

export { uploadApiImage };

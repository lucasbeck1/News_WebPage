import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import {
  deleteApiPublicity,
  getAllPublicities,
} from "../../../services/admin/publicities";

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

function DeletePublicity(props: { data: Publicity }) {
  const dispatch = useDispatch();
  const articleData = props.data;

  const handleClickOpen = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "rgb(18,109,162)",
      cancelButtonColor: "grey",
      confirmButtonText: "Yes, delete it!",
      preConfirm: () => {
        const dataId: number = articleData.id;
        deleteApiPublicity(dataId)
          .then((response) => {
            if (response.message !== "Delete succesfull") {
              throw new Error(response.message);
            }
            return response.message;
          })
          .catch((error) => {
            Swal.fire("Request failed", `${error}`, "error");
            /* Swal.showValidationMessage(`Request failed: ${error}`); */
          });
      },
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "The publicity has been deleted", "success");
        }
      })
      .then(() => {
        getAllPublicities(dispatch);
      });
  };

  return (
    <IconButton
      sx={{ p: 0, m: 0 }}
      size="small"
      aria-label="delete"
      color="default"
      onClick={() => handleClickOpen()}
    >
      <DeleteIcon />
    </IconButton>
  );
}

export default DeletePublicity;

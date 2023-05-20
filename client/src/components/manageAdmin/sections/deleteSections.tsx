import { useDispatch } from "react-redux";

import {
  deleteApiSection,
  getApiSections,
} from "../../../services/admin/sections";

import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Section {
  id: number;
  name: string;
  quantity?: number;
}

function DeleteSection(props: { section: Section }) {
  const { name, id } = props.section;
  const dispatch = useDispatch();

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
        deleteApiSection(id)
          .then((response) => {
            if (response.message !== "Delete succesfull") {
              throw new Error(response.message);
            }
            return response.message;
          })
          .catch((error) => {
            Swal.fire(`Request failed`, `${error}`, "error");
          });
      },
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            `${name} Deleted!`,
            "The section has been deleted",
            "success"
          );
        }
      })
      .then(() => {
        getApiSections(dispatch);
      });
  };

  return (
    <IconButton
      sx={{ p: 0, m: 0 }}
      size="small"
      aria-label="delete"
      color="default"
      onClick={handleClickOpen}
    >
      <DeleteIcon />
    </IconButton>
  );
}

export default DeleteSection;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getAuthors, deleteAuthor } from "../../../services/authors/actions";

import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Author = {
  id: string;
  admin: boolean;
  name: string;
  mail: string;
  password?: string;
};

function ManageDelete(props: { author: Author }) {
  const dispatch = useDispatch();
  const { name, id } = props.author;
  const allAuthors = useSelector((state: RootState) => state.authors);
  const admin = allAuthors.find((u) => u.admin === true);
  const adminKey = admin?.id || "";

  console.log(id, adminKey);

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
        deleteAuthor(id, adminKey)
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
        getAuthors(dispatch);
        return result;
      })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire(`${name} Deleted!`, "The user has been deleted", "success");
        }
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

export default ManageDelete;

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { getApiAuthors, deleteApiAuthor } from "../../../services/admin/authors";

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
  const typeUser: string = useSelector((state: RootState) => state.auth.type);

  const handleClickOpen = () => {
    if (typeUser !== "admin") {
      return Swal.fire(
        `Request failed`,
        "Administrator permissions not found",
        "error"
      );
    }

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
        deleteApiAuthor(id)
          .then((response) => {
            if (response.message !== "Delete succesfull") {
              throw new Error(response.message);
            }
            return response.message;
          })
          .catch((error) => {
            return Swal.fire(`Request failed`, `${error}`, "error");
          });
      },
    })

      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire(`${name} Deleted!`, "The user has been deleted", "success");
        }
      })
      .then(() => {
        return getApiAuthors(dispatch);
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

import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

import {
  deleteApiArticle,
  getApiArticles,
} from "../../../services/admin/articles";

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Article = {
  id: number;
  headline: string;
  drophead: string;
  body: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  author: { name: string };
  section: { name: string };
};

function DeleteArticle(props: { data: Article }) {
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
        deleteApiArticle(dataId)
          .then((response) => {
            if (response.message !== "Delete succesfull") {
              throw new Error(response.message);
            }
            return response.message;
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "The article has been deleted", "success");
        }
      })
      .then(() => {
        getApiArticles(dispatch);
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

export default DeleteArticle;

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

function DeleteSection() {
  const handleClickOpen = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(18,109,162)",
      cancelButtonColor: "grey",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "The section has been deleted", "success");
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

export default DeleteSection;

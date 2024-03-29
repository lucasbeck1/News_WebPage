import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  getApiSponsors,
  updateApiSponsor,
} from "../../../services/admin/sponsors";

import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

interface User {
  user: {
    id: string;
    name: string;
    mail: string;
  };
}

type Input = {
  admin?: boolean;
  name?: string;
  mail?: string;
  oldPassword?: string;
  newPassword?: string;
};

enum InputProp {
  name = "name",
  mail = "mail",
  oldPassword = "oldPassword",
  newPassword = "newPassword",
}

function ManageModify({ user }: User) {
  //****************************
  // **** Global Variables ****
  //****************************
  const dispatch = useDispatch();
  const typeUser = useSelector((state: RootState) => state.auth.type);

  //****************************
  // **** Local Variables ****
  //****************************

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    name: "",
    mail: "",
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState({});
  const initialDataJson = JSON.stringify({
    name: "",
    mail: "",
    oldPassword: "",
    newPassword: "",
  });
  const inputJson = JSON.stringify(input);

  const id: string = user.id;

  //****************************
  // **** Functions ****
  //****************************

  function handleOpen() {
    setInput({
      name: "",
      mail: "",
      oldPassword: "",
      newPassword: "",
    });
    setError({});
    setOpen(true);
  }

  function handleClose() {
    setInput({
      name: "",
      mail: "",
      oldPassword: "",
      newPassword: "",
    });
    setError({});
    setOpen(false);
  }

  function changeInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) {
    setInput({
      ...input,
      [name]: e.target.value,
    });
    setError(
      verifyInput({
        ...input,
        [name]: e.target.value,
      })
    );
  }

  function verifyInput(input: Input) {
    let err: Input = {};
    const RegEXP_User = /[`ª!@#$%^*_+=[\]{};'"\\|,<>/~]/;
    const RegEXP_Mail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const RegEXP_Password = /[`'"]/;
    // ** Name **
    if (input.name && RegEXP_User.test(input.name)) {
      err.name = "Special characters are not accepted";
    }
    // ** Mail **
    else if (input.mail && !RegEXP_Mail.test(input.mail)) {
      err.mail = "Invalid e-mail address";
    }
    // ** OldPassword **
    else if (!input.oldPassword) {
      err.oldPassword = "Field Required";
    } else if (input.oldPassword && input.oldPassword.length < 4) {
      err.oldPassword = "Password minimum 4 characters";
    } else if (input.oldPassword && RegEXP_Password.test(input.oldPassword)) {
      err.oldPassword = "Quote characters are not allowed";
    }
    // ** NewPassword **
    else if (input.newPassword && input.newPassword.length < 4) {
      err.newPassword = "Password minimum 4 characters";
    } else if (input.newPassword && RegEXP_Password.test(input.newPassword)) {
      err.newPassword = "Quote characters are not allowed";
    }
    return err;
  }

  function comprobe(error: Input, name: InputProp): boolean {
    if (error[name]) {
      return true;
    } else {
      return false;
    }
  }

  function errorExplain(error: Input, name: InputProp) {
    if (error[name]) {
      return error[name];
    }
  }

  async function submit() {
    if (typeUser !== "admin") {
      Swal.fire(`Request failed`, "Administrator permissions not found", "error");
      return handleClose();
    }

    const msg = await updateApiSponsor(
      {
        name: input.name,
        mail: input.mail,
        password: input.mail,
      },
      id
    );
    if (msg.message === "Update succesfull") {
      Swal.fire("Updated!", `Update succesfull: ${user.name}`, "success");
    } else {
      Swal.fire("Error!", msg.message, "error");
    }

    getApiSponsors(dispatch);
    handleClose();
  }

  return (
    <>
      <IconButton
        sx={{ p: 0, m: 0 }}
        size="small"
        aria-label="modify"
        color="primary"
        onClick={handleOpen}
      >
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>Edit Sponsor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the fields you want to change
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={input.name}
            onChange={(e) => changeInput(e, "name")}
            error={comprobe(error, InputProp.name)}
            helperText={errorExplain(error, InputProp.name)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="mail"
            name="mail"
            label="Mail"
            type="text"
            fullWidth
            variant="outlined"
            value={input.mail}
            onChange={(e) => changeInput(e, "mail")}
            error={comprobe(error, InputProp.mail)}
            helperText={errorExplain(error, InputProp.mail)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="oldPassword"
            name="oldPassword"
            label="OldPassword"
            type="text"
            fullWidth
            variant="outlined"
            value={input.oldPassword}
            onChange={(e) => changeInput(e, "oldPassword")}
            error={comprobe(error, InputProp.oldPassword)}
            helperText={errorExplain(error, InputProp.oldPassword)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="newPassword"
            name="newPassword"
            label="newPassword"
            type="text"
            fullWidth
            variant="outlined"
            value={input.newPassword}
            onChange={(e) => changeInput(e, "newPassword")}
            error={comprobe(error, InputProp.newPassword)}
            helperText={errorExplain(error, InputProp.newPassword)}
          />

          {typeUser !== "admin" && (
            <Typography
              variant="body2"
              style={{ paddingTop: "5px", paddingLeft: "10px", color: "red" }}
            >
              You dont have admin permissions
            </Typography>
          )}

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {initialDataJson === inputJson ||
            Object.keys(error).length ||
            typeUser !== "admin" ? (
              <Button disabled>Modify</Button>
            ) : (
              <Button
                onClick={() => {
                  submit();
                }}
              >
                Modify
              </Button>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ManageModify;

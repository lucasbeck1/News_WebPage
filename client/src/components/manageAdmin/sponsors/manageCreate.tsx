import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  getApiSponsors,
  createApiSponsor,
} from "../../../services/admin/sponsors";

import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Typography } from "@mui/material";

type Input = {
  admin?: boolean;
  name?: string;
  mail?: string;
  password?: string;
};

enum InputProp {
  name = "name",
  mail = "mail",
  password = "password",
}

function ManageCreate() {
  //****************************
  // **** Global Variables ****
  //****************************
  const dispatch = useDispatch();
  const typeUser: string = useSelector((state: RootState) => state.auth.type);

  //****************************
  // **** Local Variables ****
  //****************************

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    name: "",
    mail: "",
    password: "",
  });
  const [error, setError] = useState({});
  const initialDataJson = JSON.stringify({
    name: "",
    mail: "",
    password: "",
  });
  const inputJson = JSON.stringify(input);

  //****************************
  // **** Functions ****
  //****************************

  function handleOpen() {
    setInput({
      name: "",
      mail: "",
      password: "",
    });
    setOpen(true);
  }

  function handleClose() {
    setInput({
      name: "",
      mail: "",
      password: "",
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
    if (!input.name) {
      err.name = "Name required";
    } else if (RegEXP_User.test(input.name)) {
      err.name = "Special characters are not accepted";
    }
    // ** Mail **
    else if (!input.mail) {
      err.mail = "Mail required";
    } else if (!RegEXP_Mail.test(input.mail)) {
      err.mail = "Invalid e-mail address";
    }
    // ** Password **
    else if (!input.password) {
      err.password = "Password required";
    } else if (input.password.length < 4) {
      err.password = "Password minimum 4 characters";
    } else if (RegEXP_Password.test(input.password)) {
      err.password = "Quote characters are not allowed";
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

    const msg = await createApiSponsor(input);
    if (msg.message === "Register Succesfull") {
      Swal.fire("Created!", `Create succesfull: ${input.name}`, "success");
    } else {
      Swal.fire("Error!", msg.message, "error");
    }

    getApiSponsors(dispatch);
    handleClose();
  }

  return (
    <>
      <Button
        sx={{ p: 0, m: 0 }}
        size="small"
        aria-label="modify"
        color="primary"
        onClick={handleOpen}
        variant="outlined"
        endIcon={<AddCircleIcon />}
      >
        ADD
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>Create Sponsor</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill all the fields</DialogContentText>
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
            id="password"
            name="password"
            label="Password"
            type="text"
            fullWidth
            variant="outlined"
            value={input.password}
            onChange={(e) => changeInput(e, "password")}
            error={comprobe(error, InputProp.password)}
            helperText={errorExplain(error, InputProp.password)}
          />
          {typeUser === "admin" ? (
            <></>
          ) : (
            <Typography
              variant="body2"
              style={{ paddingTop: "5px", paddingLeft: "10px", color: "red" }}
            >
              "You dont have admin permissions"
            </Typography>
          )}

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {initialDataJson === inputJson ||
            Object.keys(error).length ||
            typeUser !== "admin" ? (
              <Button disabled>Create</Button>
            ) : (
              <Button
                onClick={() => {
                  submit();
                }}
              >
                Create
              </Button>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ManageCreate;

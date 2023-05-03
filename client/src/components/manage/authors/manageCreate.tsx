import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getAuthors, createAuthor } from "../../../services/authors/actions";

import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Typography } from "@mui/material";

type Input = {
  admin?: boolean;
  name?: string;
  mail?: string;
  password?: string;
  adminKey?: string;
};

enum InputProp {
  name = "name",
  mail = "mail",
  password = "password",
  adminKey = "adminKey",
}

function ManageCreate() {
  //****************************
  // **** Global Variables ****
  //****************************
  const dispatch = useDispatch();
  const allAuthors = useSelector((state: RootState) => state.authors);
  const admin = allAuthors.find((u) => u.admin === true);

  //****************************
  // **** Local Variables ****
  //****************************

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    admin: false,
    name: "",
    mail: "",
    password: "",
    adminKey: admin?.id || "",
  });
  console.log(input);
  const [error, setError] = useState({});
  const initialDataJson = JSON.stringify({
    admin: false,
    name: "",
    mail: "",
    password: "",
    adminKey: admin?.id || "",
  });
  const inputJson = JSON.stringify(input);

  //****************************
  // **** Functions ****
  //****************************

  function handleOpen() {
    setInput({
      admin: false,
      name: "",
      mail: "",
      password: "",
      adminKey: admin?.id || "",
    });
    setOpen(true);
  }

  function handleClose() {
    setInput({
      admin: false,
      name: "",
      mail: "",
      password: "",
      adminKey: admin?.id || "",
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
    let RegEXP_User = /[`ª!@#$%^*_+=[\]{};"\\|,<>/~]/;
    let RegEXP_Mail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
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
    }
    // ** AdminKey **
    else if (!input.adminKey) {
      err.adminKey = "You dont have admin permissions";
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
    const msg = await createAuthor(input);
    if (msg.message === "Create succesfull") {
      Swal.fire("Created!", `Create succesfull: ${input.name}`, "success");
    } else {
      Swal.fire("Error!", msg.message, "error");
    }

    getAuthors(dispatch);
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
        <DialogTitle>Create User</DialogTitle>
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
          <FormControl>
            <FormLabel id="radio-group-label-1">Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="radio-group-label-1"
              name="typebook"
              onChange={(e) => changeInput(e, "admin")}
              value={input.admin}
            >
              <FormControlLabel
                name="admin"
                value={true}
                control={<Radio />}
                label="Admin"
              />
              <FormControlLabel
                name="admin"
                value={false}
                control={<Radio />}
                label="User"
              />
            </RadioGroup>
          </FormControl>

          {comprobe(error, InputProp.adminKey) && (
            <Typography
              variant="body2"
              style={{ paddingTop: "5px", paddingLeft: "10px", color: "red" }}
            >
              {errorExplain(error, InputProp.adminKey)}
            </Typography>
          )}

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {initialDataJson === inputJson || Object.keys(error).length ? (
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

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { RootState } from "../../store";
import { createApiPublicity } from "../../services/sponsor/publicities";
import { domain } from "../../services/url";
import UploadInput from "./uploadInput";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

type Input = {
  name?: string;
  image?: string;
  start?: string;
  finish?: string;
};

enum InputProp {
  image = "image",
  start = "start",
  finish = "finish",
}

function CreateArticle() {
  //****************************
  // **** Global Variables ****
  //****************************

  const dispatch = useDispatch();
  const nameUser = useSelector((state: RootState) => state.auth.name);

  //****************************
  // **** Local Variables ****
  //****************************
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState({
    name: nameUser,
    image: "",
    start: "",
    finish: "",
  });

  const [errors, setErrors] = useState({});

  const initialDataJson = JSON.stringify({
    name: nameUser,
    image: "",
    start: "",
    finish: "",
  });
  const inputJson = JSON.stringify(input);

  //****************************
  // **** Functions ****
  //****************************

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setInput({
      name: "",
      image: "",
      start: "",
      finish: "",
    });
    setErrors({});
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
    setErrors(
      verifyInput({
        ...input,
        [name]: e.target.value,
      })
    );
  }

  const handleImageData = (status: string, imageName: string): void => {
    if (status === "Upload Ok") {
      setInput({
        ...input,
        image: domain + "/sponsor/images/" + imageName,
      });
      setErrors(
        verifyInput({
          ...input,
          image: domain + "/sponsor/images/" + imageName,
        })
      );
    } else {
      return;
    }
  };

  function verifyInput(input: Input) {
    let err: Input = {};
    // ** start **
    if (!input.start) {
      err.start = "Start date required";
    }
    // ** finish **
    else if (!input.finish) {
      err.finish = "Finish date required";
    }
    // ** image **
    else if (!input.image) {
      err.image = "No image uploaded";
    } else if (
      input.image.slice(-3) !== "bmp" &&
      input.image.slice(-3) !== "jpg" &&
      input.image.slice(-4) !== "jpeg" &&
      input.image.slice(-3) !== "jpg" &&
      input.image.slice(-3) !== "tif" &&
      input.image.slice(-4) !== "tiff" &&
      input.image.slice(-3) !== "png" &&
      input.image.slice(-3) !== "svg"
    ) {
      err.image = "Not a valid image";
    }
    return err;
  }

  function comprobe(errors: Input, name: InputProp): boolean {
    if (errors[name]) {
      return true;
    } else {
      return false;
    }
  }

  function errorExplain(errors: Input, name: InputProp) {
    if (errors[name]) {
      return errors[name];
    }
  }

  async function submit() {
    /* 
    const msg = await createApiPublicity(input);
    if (msg.message === "Create succesfull") {
      Swal.fire("Created!", "Created succesfully", "success");
    } else {
      Swal.fire("Error!", msg.message, "error");
    }
    */
    handleClose();
  }

  console.log(input);

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
        <DialogTitle>Create Article</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill all the fields</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="start"
            name="start"
            label="Start date"
            type="date"
            fullWidth
            variant="outlined"
            value={input.start}
            onChange={(e) => changeInput(e, "start")}
            error={comprobe(errors, InputProp.start)}
            helperText={errorExplain(errors, InputProp.start)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="finish"
            name="finish"
            label="Finish date"
            type="date"
            fullWidth
            variant="outlined"
            value={input.finish}
            onChange={(e) => changeInput(e, "finish")}
            error={comprobe(errors, InputProp.finish)}
            helperText={errorExplain(errors, InputProp.finish)}
          />

          <Box sx={{ mt: 1 }}>
            <UploadInput sendData={handleImageData} />

            {comprobe(errors, InputProp.image) ? (
              <Typography
                variant="body2"
                style={{ paddingTop: "5px", paddingLeft: "10px", color: "red" }}
              >
                {errorExplain(errors, InputProp.image)}
              </Typography>
            ) : (
              <></>
            )}

            {input.image ? (
              <Box
                sx={{
                  height: "100px",
                  padding: "10px",
                }}
              >
                <img src={input.image} alt="img" height={"100px"} />
              </Box>
            ) : (
              <></>
            )}
          </Box>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {initialDataJson === inputJson || Object.keys(errors).length ? (
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

export default CreateArticle;

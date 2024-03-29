import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { RootState } from "../../store/store";
import {
  getPublicityBySponsor,
  updateApiPublicity,
} from "../../services/sponsor/publicities";
import { domain } from "../../services/url";
import UploadInput from "./uploadInput";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

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

function ModifyPublicity(props: { data: Publicity }) {
  //****************************
  // **** Global Variables ****
  //****************************

  const dispatch = useDispatch();
  const nameUser = useSelector((state: RootState) => state.auth.name);
  const publicityData = props.data;

  //****************************
  // **** Local Variables ****
  //****************************
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState({
    image: publicityData.image,
    active: publicityData.active,
  });

  const initialDataJson = JSON.stringify({
    image: publicityData.image,
    active: publicityData.active,
  });
  const inputJson = JSON.stringify(input);

  //****************************
  // **** Functions ****
  //****************************

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function changeInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) {
    const activeValue = String(e.target.value).toLowerCase() === "true";
    setInput({
      ...input,
      [name]: activeValue,
    });
  }

  const handleImageData = (status: string, imageName: string): void => {
    if (status === "Upload Ok") {
      setInput({
        ...input,
        image: domain + "/sponsor/images/" + imageName,
      });
    } else {
      return;
    }
  };

  async function submit() {
    const msg = await updateApiPublicity(input, publicityData.id);
    if (msg.message === "Update succesfull") {
      Swal.fire("Updated!", "Publicity update succesfully", "success");
      getPublicityBySponsor(dispatch, nameUser);
    } else {
      Swal.fire("Error!", msg.message, "error");
    }

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
        <DialogTitle>Update Publicity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the fields you want to change
          </DialogContentText>
          <Box sx={{ mt: 1 }}>
            <UploadInput sendData={handleImageData} />

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

          <FormControl>
            <FormLabel id="radio-group-label-1">Visible</FormLabel>
            <RadioGroup
              row
              aria-labelledby="radio-group-label-1"
              name="active"
              onChange={(e) => changeInput(e, "active")}
              value={input.active}
            >
              <FormControlLabel
                name="active"
                value={true}
                control={<Radio />}
                label="On"
              />
              <FormControlLabel
                name="active"
                value={false}
                control={<Radio />}
                label="Off"
              />
            </RadioGroup>
          </FormControl>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {initialDataJson === inputJson ? (
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

export default ModifyPublicity;

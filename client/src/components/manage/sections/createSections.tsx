import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Swal from "sweetalert2";

function CreateSection() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = React.useState("");

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSection(event.target.value as string);
  };

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
        <DialogTitle>Create Section</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newSection"
            name="newSection"
            label="New Section"
            type="text"
            fullWidth
            variant="outlined"
            /* 
            value={input.newSection}
            onChange={(e)=>inputChange(e)}
            error={error.newSection}
            helperText={error.newSection} 
            */
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Create</Button>
            {/* {initialDataJson === inputJson || Object.keys(error).length ? (<Button disabled onClick={modifyUserById}>Modify</Button>) : (<Button onClick={modifyUserById}>Modify</Button>)} */}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateSection;

import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

interface sectionName {
  sectionName: string;
}

function ModifySection(props: sectionName) {
  const { sectionName } = props;
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
        <DialogTitle>Modify Section</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are going to update {sectionName} name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="sectionName"
            name="sectionName"
            label="Section Name"
            type="text"
            fullWidth
            variant="outlined"
            /* 
            value={input.sectionName}
            onChange={(e)=>inputChange(e)}
            error={error.sectionName}
            helperText={error.sectionName} 
            */
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Modify</Button>
            {/* {initialDataJson === inputJson || Object.keys(error).length ? (<Button disabled onClick={modifyUserById}>Modify</Button>) : (<Button onClick={modifyUserById}>Modify</Button>)} */}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModifySection;

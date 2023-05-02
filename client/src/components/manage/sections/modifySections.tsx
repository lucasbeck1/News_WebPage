import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";

import { updateSection, getSections } from "../../../services/sections/actions";

import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface Section {
  id: number;
  name: string;
  quantity?: number;
}

function ModifySection(props: { section: Section }) {
  const allSections = useSelector((state: RootState) => state.sections);
  const { name, id } = props.section;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [newName, setNewName] = React.useState("");
  const [error, setError] = React.useState("");

  function handleOpen() {
    setNewName("");
    setOpen(true);
  }

  function handleClose() {
    setNewName("");
    setOpen(false);
  }

  const sectionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewName(event.target.value as string);
    verifyDuplicate(event.target.value as string);
  };

  const verifyDuplicate = (name: string) => {
    const duplicate = allSections.find(
      (section) => section.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
      setError("Duplicate Section");
    } else {
      setError("");
    }
  };

  function comprobe(error: string): boolean {
    if (error) {
      return true;
    } else {
      return false;
    }
  }

  async function submit() {
    const msg = await updateSection(id, newName);
    Swal.fire(`${name} Updated!`, msg.message, "success");
    getSections(dispatch);
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
        <DialogTitle>Modify Section</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are going to update {name} name
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
            value={newName}
            onChange={(e) => sectionChange(e)}
            error={comprobe(error)}
            helperText={error}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {!newName || error ? (
              <Button disabled>Modify</Button>
            ) : (
              <Button onClick={() => submit()}>Modify</Button>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModifySection;

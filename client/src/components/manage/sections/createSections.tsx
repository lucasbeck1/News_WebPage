import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";

import { createSection, getSections } from "../../../services/sections/actions";

import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function CreateSection() {
  const allSections = useSelector((state: RootState) => state.sections);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [section, setSection] = React.useState("");
  const [error, setError] = React.useState("");

  function handleOpen() {
    setSection("");
    setOpen(true);
  }

  function handleClose() {
    setSection("");
    setOpen(false);
  }

  const sectionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSection(event.target.value as string);
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
    const msg = await createSection(section);
    Swal.fire("Created!", msg.message, "success");
    getSections(dispatch);
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
            value={section}
            onChange={(e) => sectionChange(e)}
            error={comprobe(error)}
            helperText={error}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {!section || error ? (
              <Button disabled>Create</Button>
            ) : (
              <Button onClick={() => submit()}>Create</Button>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateSection;

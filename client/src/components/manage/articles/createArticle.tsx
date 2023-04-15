import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";

function CreateArticle() {
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
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill all the fields</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="headline"
            name="headline"
            label="Headline"
            type="text"
            fullWidth
            variant="outlined"
            /* 
            value={input.headline}
            onChange={(e)=>inputChange(e)}
            error={error.headline}
            helperText={error.headline} 
            */
          />
          <TextField
            autoFocus
            margin="dense"
            id="drophead"
            name="drophead"
            label="Drophead"
            type="text"
            fullWidth
            variant="outlined"
            /* 
            value={input.drophead}
            onChange={(e)=>inputChange(e)}
            error={error.drophead}
            helperText={error.drophead} 
            */
          />
          <TextField
            autoFocus
            margin="dense"
            id="body"
            name="body"
            label="Body"
            type="text"
            fullWidth
            variant="outlined"
            /*   
            value={input.body}
            onChange={(e)=>inputChange(e)}
            error={error.body}
            helperText={error.body} 
            */
          />
          <TextField
            autoFocus
            margin="dense"
            id="image"
            name="image"
            label=""
            type="file"
            fullWidth
            variant="outlined"
            /*   
            value={input.image}
            onChange={(e)=>inputChange(e)}
            error={error.image}
            helperText={error.image} 
            */
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Image</InputAdornment>
              ),
            }}
          />
          <Box sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Section</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Section"
                name={"section"}
                onChange={handleChange}
                value={section}
              >
                <MenuItem value={10}>sport</MenuItem>
                <MenuItem value={20}>bussines</MenuItem>
                <MenuItem value={30}>food</MenuItem>
              </Select>
            </FormControl>
          </Box>
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

export default CreateArticle;

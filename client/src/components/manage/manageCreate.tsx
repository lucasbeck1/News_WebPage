import { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
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

function ManageCreate() {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
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
            id="username"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            /* 
            value={input.username}
            onChange={(e)=>inputChange(e)}
            error={error.username}
            helperText={error.username} 
            */
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="text"
            fullWidth
            variant="outlined"
            /*   
            value={input.email}
            onChange={(e)=>inputChange(e)}
            error={error.email}
            helperText={error.email} 
            */
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
            /*   
            value={input.password}
            onChange={(e)=>inputChange(e)}
            error={error.password}
            helperText={error.password} */
          />
          <FormControl>
            <FormLabel id="radio-group-label-1">Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="radio-group-label-1"
              name="typebook"
              /*  
              onChange={e=>inputChange(e)}
              value={input.role} 
              */
            >
              <FormControlLabel
                name="role"
                value="admin"
                control={<Radio />}
                label="Admin"
              />
              <FormControlLabel
                name="role"
                value="user"
                control={<Radio />}
                label="User"
              />
            </RadioGroup>
          </FormControl>
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

export default ManageCreate;

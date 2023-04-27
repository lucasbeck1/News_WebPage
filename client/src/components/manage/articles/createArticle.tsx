import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../store";
import { getSections } from "../../../services/sections/actions";
import { createArticle } from "../../../services/articles/actions";
import { localhost } from "../../../services/url";
import UploadInput from "./uploadInput";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import { Typography } from "@mui/material";

type ArticleCreation = {
  headline: string;
  drophead: string;
  body: string;
  image: string;
  author: string;
  section: string;
};

type Input = {
  headline?: string;
  drophead?: string;
  body?: string;
  image?: string;
  author?: string;
  section?: string;
};

enum InputProp {
  headline = "headline",
  drophead = "drophead",
  body = "body",
  image = "image",
  section = "section",
}

function CreateArticle() {
  //****************************
  // **** Global Variables ****
  //****************************

  const dispatch = useDispatch();

  useEffect(() => {
    getSections(dispatch);
  }, []);

  const allSections = useSelector((state: RootState) => state.sections);

  const tempAuthors = [
    {
      name: "Desmond Jachi",
      mail: "desjakito@mail.com",
      admin: false,
    },
    {
      name: "lucas becfor",
      mail: "lucas@mail.com",
      admin: true,
    },
    {
      name: "Sosana Guterlom",
      mail: "sosgm1@mail.com",
      admin: false,
    },
    {
      name: "Maximo Sum",
      mail: "max256@mail.com",
      admin: false,
    },
    {
      name: "Lucas Becord",
      mail: "admin@mail.com",
      admin: false,
    },
    {
      name: "Jonh Doe",
      mail: "jonh@mail.com",
      admin: false,
    },
    {
      name: "Tusan barr",
      mail: "tusan@mail.com",
      admin: false,
    },
  ];
  const tempRandomAuthor = tempAuthors[Math.round(Math.random() * 6)];

  //****************************
  // **** Local Variables ****
  //****************************
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState({
    headline: "",
    drophead: "",
    body: "",
    image: "",
    author: tempRandomAuthor.name,
    section: "",
  });

  const [errors, setErrors] = useState({});

  const initialDataJson = JSON.stringify({
    headline: "",
    drophead: "",
    body: "",
    image: "",
    author: tempRandomAuthor.name,
    section: "",
  });
  const inputJson = JSON.stringify(input);

  //****************************
  // **** Functions ****
  //****************************

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

  function changeSelect(e: SelectChangeEvent<string>, name: string) {
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

  function verifyInput(input: Input) {
    let err: Input = {};
    // ** headline **
    if (!input.headline) {
      err.headline = "Headline required";
    } else if (input.headline.length > 100) {
      err.headline = "The headline is too long";
    }
    // ** drophead **
    else if (!input.drophead) {
      err.drophead = "Drophead required";
    } else if (input.drophead.length > 500) {
      err.drophead = "The drophead is too long";
    }
    // ** body **
    else if (!input.body) {
      err.body = "Body required";
    } else if (input.body.length > 50000) {
      err.body = "The body is too long";
    }
    // ** section **
    else if (!input.section) {
      err.section = "Select section required";
    }
    // ** section **
    else if (!input.image) {
      err.image = "No image uploaded";
    }
    return err;
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setInput({
      headline: "",
      drophead: "",
      body: "",
      image: "",
      author: "Tusan barr",
      section: "",
    });
    setErrors({});
    setOpen(false);
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
    const msg = await createArticle(input);
    alert(msg.message);
    handleClose();
  }

  const handleImageData = (status: string, imageName: string): void => {
    if (status === "Upload Ok") {
      setInput({
        ...input,
        image: imageName,
      });
      setErrors(
        verifyInput({
          ...input,
          image: imageName,
        })
      );
    } else {
      return;
    }
  };

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
            id="headline"
            name="headline"
            label="Headline"
            type="text"
            fullWidth
            variant="outlined"
            value={input.headline}
            onChange={(e) => changeInput(e, "headline")}
            error={comprobe(errors, InputProp.headline)}
            helperText={errorExplain(errors, InputProp.headline)}
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
            value={input.drophead}
            onChange={(e) => changeInput(e, "drophead")}
            error={comprobe(errors, InputProp.drophead)}
            helperText={errorExplain(errors, InputProp.drophead)}
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
            value={input.body}
            onChange={(e) => changeInput(e, "body")}
            error={comprobe(errors, InputProp.body)}
            helperText={errorExplain(errors, InputProp.body)}
          />

          <Box sx={{ mt: 1 }}>
            <FormControl fullWidth error={comprobe(errors, InputProp.section)}>
              <InputLabel id="simple-select-label">Section</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                label="Section"
                name="section"
                onChange={(e) => changeSelect(e, "section")}
                value={input.section}
              >
                {allSections.map((section) => (
                  <MenuItem value={section.name}>{section.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errorExplain(errors, InputProp.section)}
              </FormHelperText>
            </FormControl>
            {comprobe(errors, InputProp.section) ? (
              <></>
            ) : (
              <>
                <br />
              </>
            )}

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
                <img
                  src={localhost + "/images/" + input.image}
                  alt="img"
                  height={"100px"}
                />
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

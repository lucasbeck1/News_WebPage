import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../../store";

import { uploadImage } from "../../../services/images/actions";

import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

interface ChildProps {
  sendData: (data: string, name: string) => void;
}

function UploadInput(props: ChildProps) {
  /* const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    if (selectedFile === null) {
      return;
    }

    const formData: FormData = new FormData();
    formData.append("image", selectedFile);

    const res = await uploadImage(formData);
    props.sendData(res.message, selectedFile.name);
    alert(res.message);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  }; */

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const selectAndSubmmitFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const file = event.target.files?.[0] || null;

    if (file === null) {
      return;
    }

    setLoading(true);

    const formData: FormData = new FormData();
    formData.append("image", file);

    const res = await uploadImage(formData);
    props.sendData(res.message, res.fileName);

    setLoading(false);

    if (res.message === "Upload Ok") {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <br />
      {/*
      <TextField
        autoFocus
        fullWidth
        margin="dense"
        id="image"
        label=""
        variant="outlined"
        type="file"
        name="image"
        onChange={handleFileChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">Image</InputAdornment>
          ),
        }}
        error={comprobe(errors, InputProp.image)}
        helperText={errorExplain(errors, InputProp.image)}
      /> 
      */}

      {/*   
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="image"
          onChange={handleFileChange}
        /> 
        <button type="submit">Upload</button>
      </form> 
      */}

      <label
        htmlFor="inputImage"
        style={{ color: "rgba(0, 0, 0, 0.6)", paddingLeft: "10px" }}
      >
        Image{" | "}
      </label>
      <input
        id="inputImage"
        type="file"
        accept=".png, .jpg, .jpeg"
        name="image"
        onChange={selectAndSubmmitFile}
      />

      {loading && <CircularProgress size={"1rem"} color={"primary"} />}
      {error && (
        <Typography
          variant="body2"
          style={{ paddingTop: "10px", paddingLeft: "10px", color: "red" }}
        >
          Error on upload image, please select it again
        </Typography>
      )}
    </>
  );
}

export default UploadInput;

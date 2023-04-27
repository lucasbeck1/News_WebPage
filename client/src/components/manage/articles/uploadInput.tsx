import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../../store";

import { uploadImage } from "../../../services/images/actions";

import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";

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

  const selectAndSubmmitFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const file = event.target.files?.[0] || null;

    if (file === null) {
      return;
    }

    const formData: FormData = new FormData();
    formData.append("image", file);

    const res = await uploadImage(formData);
    props.sendData(res.message, res.fileName);
    alert(res.message);
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

      <br />
      <br />
    </>
  );
}

export default UploadInput;

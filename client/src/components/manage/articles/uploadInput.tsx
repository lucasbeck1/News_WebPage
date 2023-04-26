import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../../store";

import { getArticles } from "../../../services/articles/actions";

import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";

function UploadInput() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    if (selectedFile === null) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post(
        "http://localhost:3001/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log("Imagen subida correctamente");
      // Hacer algo con la respuesta si es necesario
      alert(response.data.message);
    } catch (error) {
      // console.error("Error al subir la imagen", error);
      // Manejar el error si es necesario
      alert(error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  return (
    <>
      <hr />
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="image"
          onChange={handleFileChange}
        />

        {/*  <TextField
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
          
        /> */}

        <button type="submit">Upload</button>
      </form>
      <hr />
    </>
  );
}

export default UploadInput;

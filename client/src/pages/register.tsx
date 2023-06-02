import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

import { RootState } from "../store";
import { registerSponsorApi } from "../services/public/auth";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";

type Input = {
  name?: string;
  mail?: string;
  password?: string;
};

enum InputProp {
  name = "name",
  mail = "mail",
  password = "password",
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth);

  const [input, setInput] = useState({
    name: "",
    mail: "",
    password: "",
  });

  const initialDataJson = JSON.stringify({
    name: "",
    mail: "",
    password: "",
  });
  const inputJson = JSON.stringify(input);

  const [error, setError] = useState({});

  function changeInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) {
    setInput({
      ...input,
      [name]: e.target.value,
    });
    setError(
      verifyInput({
        ...input,
        [name]: e.target.value,
      })
    );
  }

  function verifyInput(input: Input) {
    let err: Input = {};
    const RegEXP_User = /[`ª!@#$%^*_+=[\]{};'"\\|,<>/~]/;
    const RegEXP_Mail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const RegEXP_Quotes = /[`'"]/;
    // **.name **
    if (!input.name) {
      err.name = "Name required";
    } else if (input.name.length > 60) {
      err.name = "The name is too long";
    } else if (RegEXP_User.test(input.name)) {
      err.name = "Special characters are not allowed";
    }
    // ** mail **
    else if (!input.mail) {
      err.mail = "Mail required";
    } else if (input.mail.length > 80) {
      err.mail = "The mail is too long";
    } else if (!RegEXP_Mail.test(input.mail)) {
      err.mail = "Invalid mail";
    }
    // ** password **
    else if (!input.password) {
      err.password = "Password required";
    } else if (input.password.length < 4) {
      err.password = "The password is too short";
    } else if (input.password.length > 100) {
      err.password = "The password is too long";
    } else if (RegEXP_Quotes.test(input.password)) {
      err.password = "Quote characters are not allowed";
    }

    return err;
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

  async function handleSubmit() {
    //const msg = await registerApi(input);
    //if (msg.message === "Register Succesfull") {
    Swal.fire("Welcome", "Register Succesfull", "success");
    navigate("/");
    //} else {
    //  Swal.fire("Error", msg.message, "error");
    //}
  }

  /* 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  */

  if (user.name || user.type !== "none") {
    return <Navigate to={"/"} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <ScopedCssBaseline enableColorScheme>
          <Box sx={{ pt: 5, pl: 5 }}>
            <NavLink
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              to={`/`}
            >
              {"<-"} Go Back
            </NavLink>
          </Box>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                paddingTop: 8,
                marginTop: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <Box
                component="form"
                noValidate
                /* onSubmit={handleSubmit} */
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      autoFocus
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      value={input.name}
                      onChange={(e) => changeInput(e, "name")}
                      error={comprobe(error, InputProp.name)}
                      helperText={errorExplain(error, InputProp.name)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="mail"
                      label="Email Address"
                      name="mail"
                      autoComplete="mail"
                      value={input.mail}
                      onChange={(e) => changeInput(e, "mail")}
                      error={comprobe(error, InputProp.mail)}
                      helperText={errorExplain(error, InputProp.mail)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      autoComplete="password"
                      type="password"
                      value={input.password}
                      onChange={(e) => changeInput(e, "password")}
                      error={comprobe(error, InputProp.password)}
                      helperText={errorExplain(error, InputProp.password)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>

                {initialDataJson === inputJson || Object.keys(error).length ? (
                  <Button
                    disabled
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Register
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSubmit()}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Register
                  </Button>
                )}

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <NavLink
                      style={{
                        color: "#1976d2",
                        textDecorationColor: "rgba(25, 118, 210, 0.4)",
                      }}
                      to={`/login`}
                    >
                      <Typography component="p" variant="body2">
                        {"Already have an account? Login"}
                      </Typography>
                    </NavLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ScopedCssBaseline>
      </Container>
    </ThemeProvider>
  );
}

export default Register;

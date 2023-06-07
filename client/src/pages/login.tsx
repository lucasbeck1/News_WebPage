import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

import { RootState } from "../store";
import { loginApi, loginSponsorApi } from "../services/public/auth";

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
  mail?: string;
  password?: string;
};

enum InputProp {
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

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth);

  const [loginSponsor, setLoginSponsor] = useState(false);

  const [input, setInput] = useState({
    mail: "",
    password: "",
  });

  const initialDataJson = JSON.stringify({
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

  function changeTypeLogin() {
    if (loginSponsor) {
      setLoginSponsor(false);
    } else {
      setLoginSponsor(true);
    }
  }

  function verifyInput(input: Input) {
    let err: Input = {};
    const RegEXP_Mail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const RegEXP_Password = /[`'"]/;
    // ** mail **
    if (!input.mail) {
      err.mail = "Mail required";
    } else if (input.mail.length > 80) {
      err.mail = "The mail is too long";
    } else if (!RegEXP_Mail.test(input.mail)) {
      err.mail = "Invalid mail";
    }
    // ** password **
    else if (!input.password) {
      err.password = "Password required";
    } else if (input.password.length > 150) {
      err.password = "The password is too long";
    } else if (RegEXP_Password.test(input.password)) {
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
    if (loginSponsor) {
      const msg = await loginSponsorApi(input, dispatch);
      if (msg.message === "Loggin Succesfull") {
        navigate("/");
      } else {
        Swal.fire("Error", msg.message, "error");
      }
    } else {
      const msg = await loginApi(input, dispatch);
      if (msg.message === "Loggin Succesfull") {
        navigate("/");
      } else {
        Swal.fire("Error", msg.message, "error");
      }
    }
  }

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
            <br />
            {loginSponsor ? (
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => changeTypeLogin()}
              >
                I am an Author
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => changeTypeLogin()}
              >
                I am a Sponsor
              </Button>
            )}
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
                {loginSponsor ? "Login Sponsor" : "Login Author"}
              </Typography>
              <Box
                component="form"
                /* onSubmit={handleSubmit} */
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="mail"
                  label="Mail Address"
                  name="mail"
                  autoComplete="mail"
                  autoFocus
                  value={input.mail}
                  onChange={(e) => changeInput(e, "mail")}
                  error={comprobe(error, InputProp.mail)}
                  helperText={errorExplain(error, InputProp.mail)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={input.password}
                  onChange={(e) => changeInput(e, "password")}
                  error={comprobe(error, InputProp.password)}
                  helperText={errorExplain(error, InputProp.password)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                {initialDataJson === inputJson || Object.keys(error).length ? (
                  <Button
                    disabled
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSubmit()}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                )}

                <Grid container>
                  <Grid item xs>
                    <NavLink
                      style={{
                        color: "#1976d2",
                        textDecorationColor: "rgba(25, 118, 210, 0.4)",
                      }}
                      to={`/`}
                    >
                      <Typography component="p" variant="body2">
                        {"Forgot password?"}
                      </Typography>
                    </NavLink>
                  </Grid>
                  <Grid item>
                    <NavLink
                      style={{
                        color: "#1976d2",
                        textDecorationColor: "rgba(25, 118, 210, 0.4)",
                      }}
                      to={`/register`}
                    >
                      <Typography component="p" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Typography>
                    </NavLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ScopedCssBaseline>
      </Container>
    </ThemeProvider>
  );
}

export default Login;

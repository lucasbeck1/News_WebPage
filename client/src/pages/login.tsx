import { NavLink } from "react-router-dom";

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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
                Login
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
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

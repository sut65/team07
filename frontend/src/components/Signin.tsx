import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ambulance from "./image/Ambulance.png";
import { User } from "../models/user";
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © by "}
      <Link color="inherit" href="https://github.com/sut65/team07">
        Team07
      </Link>{" "}
      {/* {new Date().getFullYear()} */}
    </Typography>
  );
}

export default function Signin() {
  const [signin, setSignin] = React.useState<Partial<User>>();
  
  const [success, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof typeof signin;
    setSignin({
      ...signin,
      [name]: event.target.value,
    });
  };

  const Submit = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signin),
    };

    await fetch(`http://localhost:8080/signin`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          localStorage.setItem("token", res.data.Token);
          localStorage.setItem("id", res.data.user_id);
          localStorage.setItem("role", res.data.role_name);

          setSuccess(true);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          setError(true);
          console.log("error", res.error);
        }
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 5,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography align="center">
            <img style={{ width: "250px" }} className="img" src={ambulance} />
          </Typography>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={Submit}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              color="inherit"
            >
              Sign Up
            </Button>

            <Copyright />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

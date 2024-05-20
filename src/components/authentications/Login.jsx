import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../helpers/firebase";
import "./login.scss";
export function Login() {
  let navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    try {
      login(email, password).then(() => {
        navigate("/product");
      });
    } catch (e) {
      alert("Failed to login. Please try agina later.");
    }
  }

  return (
    <div
      style={{
        background: "#E5E5E5",
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      <CssBaseline />
      <Box className="form">
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 3, position: "center", right: "110px" }}
        >
          Welcome To Ecommerce Admin Pannel
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, padding: "0px 50px" }}
        >
          <TextField
            className="textField"
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            className="textField"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ background: "#F55928" }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </div>
  );
}

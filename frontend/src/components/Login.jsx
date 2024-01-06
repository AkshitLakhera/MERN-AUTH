// import React from 'react'
import { Box, Button, TextField, Typography } from "@mui/material";
import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
const Login = () => {
  const dispatch =useDispatch();
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email: inputs.email,
        password: inputs.password,
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.error("Error during request:", err);
      throw err; // Re-throw the error to be caught by the caller
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // send http request
    sendRequest().then(() => dispatch(authActions.login())).then(() => history("/user"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          marginLeft="auto"
          marginRight="auto"
          width={300}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2">Login</Typography>

          <TextField
            name="email"
            onChange={handleChange}
            type={"email"}
            value={inputs.email}
            variant="outlined"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            type="password"
            value={inputs.password}
            variant="outlined"
            placeholder="Password"
            margin="normal"
          />
          <Button variant="contained" type="submit">
           Login
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Login
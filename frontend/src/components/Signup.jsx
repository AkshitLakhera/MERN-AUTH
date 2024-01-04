// import React from 'react'
import {TextField,Box, Button, Typography} from "@mui/material"
import { useState } from "react";
const Signup = () => {
  const [input,setInputs] = useState({
    name:"",
    email:"",
    password:""
  })
  const handleChange = (e) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }
  
  const handleSubmit = (e) => {
      e.preventDefault()
      console.log(input)
      e.target.value("")
  };
  return ( 
  <div>
    <form onSubmit={handleSubmit} >
      <Box justifyContent="center" alignItems="center" marginLeft="auto" marginRight="auto" width={300} display="flex" flexDirection={"column"} >
      <Typography  marginTop="2rem" variant="h3">Signup</Typography>
       <TextField name="name" onChange={handleChange} value={input.name} variant="outlined" placeholder="Name" margin="normal"/>
        <TextField name="email" onChange={handleChange}  type="email"     value = {input.email} variant="outlined" placeholder="Email" margin="normal"/>
        <TextField name="password"  onChange={handleChange} type="password "value={input.password}  variant="outlined" placeholder="Password" margin="normal"/>
        <Button variant="contained" type="submit">Signup</Button>    
      </Box>
    </form>
  </div>
  )
}

export default Signup
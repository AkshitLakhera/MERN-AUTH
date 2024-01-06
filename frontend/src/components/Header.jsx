//Racf command for basic boiler plate
// import React from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import axios from 'axios'
import { authActions } from "../store";
axios.defaults.withCredentials =true;
export const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn)
   const sendingLogoutReq =async() => {
   const res = await axios.post('http://localhost/api/logout',null,{
    withCredentials:true
   })
   if(res.status === 200) {
    return res
   }
   return new Error ("Unable to Logout ,Pleae try again")
   }
   const handleLogout = () => {
    sendingLogoutReq().then(() => dispatch(authActions.logout()));
  };

  const [value, setvalue] = useState();
  return (
    <AppBar position="sticky" color="primary" sx={{ height: '64px' }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 'bold', marginRight: '1rem' }}>
          Mern Auth
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
         {/* Writing button clicking logic here */}
          <Tabs textColor='inherit' value={value} onChange={(e,val) => setvalue(val)}>
            {/* This is how we add route  with react-router-dom, We use here to and LinkComponent methods */}
            {/* Biggest  benifit of react-router with do routing withoit refreshing the page */}
          { !isLoggedIn && <>      
          <Tab to="/login"  LinkComponent= {Link} label="Login" sx={{ marginRight: '1rem' }} />

            <Tab  to="/signup"  LinkComponent={Link} label="Signup" />
            </>    }
            {  isLoggedIn &&  <Tab onClick={handleLogout} to="/"  LinkComponent={Link} label="Logout" />}
 </Tabs> 
        </Box>
      </Toolbar>
    </AppBar>
  );
};


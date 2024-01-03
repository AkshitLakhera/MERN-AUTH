//Racf command for basic boiler plate
// import React from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import {Link} from 'react-router-dom'
export const Header = () => {
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
            <Tab to="/login"  LinkComponent= {Link} label="Login" sx={{ marginRight: '1rem' }} />
            <Tab  to="/signup"  LinkComponent={Link} label="Signup" />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};


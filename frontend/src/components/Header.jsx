//Racf command for basic boiler plate
// import React from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';

export const Header = () => {
    const [value, setvalue] = useState();
  return (
    <AppBar position="static" color="primary" sx={{ height: '64px' }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 'bold', marginRight: '1rem' }}>
          Mern Auth
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
         {/* Writing button clicking logic here */}
          <Tabs textColor='inherit' value={value} onChange={(e,val) => setvalue(val)}>
            <Tab label="Login" sx={{ marginRight: '1rem' }} />
            <Tab label="Signup" />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};


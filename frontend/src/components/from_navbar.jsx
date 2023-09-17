import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


const MyAppBar = ({title}) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
      
        <Typography variant="h5">{title}</Typography>    
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;

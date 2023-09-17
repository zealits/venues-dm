import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SideBar from '../../components/sidebar';

export default function Dashboard() {
  return (
    <Box sx={{display:'flex'}}>
      <SideBar/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
        
        <Typography variant='h4'>
            Welcome to Dashboard
        </Typography>
        
      </Box>
    </Box>
  )
}
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles'; // Add this import
import SideBar from '../../components/sidebar';
import { Link } from 'react-router-dom';
import VendorTable from './Widget/Table';


const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem', // Adjust the font size as needed
  fontWeight: 'bold', // Make the text bold
  color: theme.palette.primary.main, // Use the primary color for the text
 
  marginBottom: theme.spacing(2), // Add some spacing at the bottom
}));

export default function Vendor() {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <StyledTitle>
            Vendor
          </StyledTitle>
          <Link to="/vendor/add"> 
            <Button variant="contained" color="primary">
              <AddIcon /> Add Vendor
            </Button>
          </Link>
        </Box>
        <Box >
     <VendorTable/>
    </Box>
       
      </Box>
    </Box>
  );
}
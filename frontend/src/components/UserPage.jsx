import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import authService from '../services/apiService.js';

const UserPage = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await authService.getUserDetails();
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  // Handle edit click
  const handleEditClick = (detailLabel) => {
    // Handle edit button click 
    console.log(`Editing ${detailLabel}`);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Hi, {userDetails ? userDetails.name : 'Loading...'}
          </Typography>
          <Box position="relative">
            <Avatar alt={userDetails ? userDetails.name : 'Loading...'} src={userDetails ? userDetails.avatar : ''} />
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="rgba(0, 0, 0, 0.5)"
            >
              <EditIcon style={{ color: 'white' }} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Date of Birth</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userDetails && (
              <TableRow>
                <TableCell align="left">{userDetails.id}</TableCell>
                <TableCell align="left">{userDetails.name}</TableCell>
                <TableCell align="left">{userDetails.email}</TableCell>
                <TableCell align="left">{userDetails.role}</TableCell>
                <TableCell align="left">{new Date(userDetails.dob).toLocaleDateString()}</TableCell>
                <TableCell align="left">
                  <Button variant="contained" onClick={() => handleEditClick('Edit')}>Edit</Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserPage;

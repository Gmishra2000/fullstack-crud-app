import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import authService from '../services/apiService.js';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const adminName = 'Admin'; // Replace with actual admin name

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await authService.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    try {
      const deleted = await authService.deleteUser(userId);
      if (deleted) {
        // Remove the deleted user 
        setUsers(users.filter(user => user.id !== userId));
        console.log(`User with ID ${userId} deleted successfully`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Hi, {adminName}
          </Typography>
          <Box position="relative">
            <Avatar alt={adminName} src="path/to/admin-avatar.png" />
          </Box>
        </Toolbar>
      </AppBar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Date of Birth</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="left">{user.id}</TableCell>
                <TableCell align="left">{user.name}</TableCell>
                <TableCell align="left">{new Date(user.dob).toLocaleDateString()}</TableCell>
                <TableCell align="left">
                  <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminPage;

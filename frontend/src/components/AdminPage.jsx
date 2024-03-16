import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AppBar, Toolbar, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import authService from '../services/apiService.js';
import defaultAvatar from '../assets/profile.png'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const adminName = 'Admin';
  const navigate = useNavigate(); 

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
        // Remove the deleted user from ui also
        toast.success("User deleted successfully");
        setUsers(users.filter(user => user.id !== userId));
        console.log(`User with ID ${userId} deleted successfully`);
      }
    } catch (error) {
      toast.success("error in deleting user");
      console.error('Error deleting user:', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear(); // Clear local storage to remove token
    navigate('/'); 
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <Avatar alt={adminName} src="path/to/admin-avatar.png" />
            <Typography variant="h6" component="div" sx={{ ml: 1 }}>
              Hi, {adminName}
            </Typography>
          </Box>
          <Box>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
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
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="left">{user.id}</TableCell>
                <TableCell align="left">{user.name}</TableCell>
                <TableCell align="left">{new Date(user.dob).toLocaleDateString()}</TableCell>
                <TableCell align="left">{user.role}</TableCell>
                <TableCell align="left"><Avatar alt={user ? user.name : 'Loading...'} src={user ? user.avatar || defaultAvatar : defaultAvatar} /></TableCell>
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

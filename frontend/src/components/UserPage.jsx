import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AppBar, Toolbar, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import authService from '../services/apiService.js';
import defaultAvatar from '../assets/profile.png'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: ''
  });
  const [errors, setErrors] = useState({});
  const [payload, setPayload] = useState({});
  const navigate = useNavigate(); 

  const fetchUserDetails = async () => {
    try {
      const response = await authService.getUserDetails();
      setUserDetails(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        dob: new Date(response.data.dob).toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Handle edit click
  const handleEditClick = () => {
    setOpenDialog(true);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    validateField(name, value);

    setPayload({ ...payload, [name]: value });
  };

  // Validate form field
  const validateField = (name, value) => {
    let error = '';
    if (!value.trim()) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Email is invalid';
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    let isValid = true;
    Object.values(formData).forEach((value) => {
      if (!value.trim()) {
        isValid = false;
      }
    });
    if (!isValid) {
      setErrors((prevState) => ({
        ...prevState,
        name: formData.name.trim() ? '' : 'Name is required',
        email: formData.email.trim() ? '' : 'Email is required',
        dob: formData.dob.trim() ? '' : 'Date of Birth is required',
      }));
    } else {
      try {
        const result = await authService.updateUser(payload);
        toast.success("User updated successfully");
        setOpenDialog(false);
        
        fetchUserDetails(); //make api call to get the updated data 

      } catch (error) {
        toast.success("error in updating user");
        console.error('Error updating user details:', error);
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();  // Clear local storage to remove token
    navigate('/'); 
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <Box position="relative" sx={{ '&:hover > .editIcon': { display: 'flex' } }}>
              <Avatar alt={userDetails ? userDetails.name : 'Loading...'} src={userDetails ? userDetails.avatar || defaultAvatar : defaultAvatar} />
              <Box
                className="editIcon"
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                display="none"
                alignItems="center"
                justifyContent="center"
                backgroundColor="rgba(0, 0, 0, 0.5)"
                color="white"
                cursor="pointer"
                onClick={handleEditClick}
              >
                <EditIcon sx={{ fontSize: 32 }} />
              </Box>
            </Box>
            <Typography variant="h6" component="div" sx={{ ml: 1 }}>
              Hi, {userDetails ? userDetails.name : 'Loading...'}
            </Typography>
          </Box>
          <Box>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.dob}
            helperText={errors.dob}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
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

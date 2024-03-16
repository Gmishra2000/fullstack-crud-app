import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, MenuItem, Typography } from '@mui/material';
import { useApiCall } from '../custom-hooks/useAPiCall.js';
import authService from '../services/apiService.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '', role: '', dob: '' });
  const [errors, setErrors] = useState({});
  const { makeApiCall, isLoading, error } = useApiCall();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    let newErrors = { ...errors };
    switch (name) {
      case 'name':
        newErrors.name = value ? '' : 'Name is required';
        break;
      case 'email':
        newErrors.email = /^\S+@\S+\.\S+$/.test(value) ? '' : 'Email is invalid';
        break;
      case 'password':
        newErrors.password = value ? '' : 'Password is required';
        break;
      case 'password_confirmation':
        newErrors.password_confirmation = value === formData.password ? '' : 'Passwords do not match';
        break;
      case 'role':
        newErrors.role = value ? '' : 'Role is required';
        break;
      case 'dob':
        newErrors.dob = value ? '' : 'Date of Birth is required';
      break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (!formData.password_confirmation) {
      newErrors.password_confirmation = 'Please retype the password';
    }
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Passwords do not match';
    }
    if (!formData.role) {
      newErrors.role = 'Select user role'
    }
    if (!formData.dob) {
      newErrors.dob = 'Date of Birth is required'
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const { name, email, password, password_confirmation, dob, role } = formData;
      try {
        const result = await makeApiCall(authService.register, { name, email, password, password_confirmation, dob, role:role.toUpperCase() });
        toast.success(result.message);
        navigate('/login'); // Redirect to login page after successful registration
      } catch (error) {
        toast.error(error.message); // tost message for registration error
        console.log(error); 
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h2 style={{textAlign:'center', marginBottom:'20px'}}>Register</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
          <TextField
            type="text"
            name="name"
            label="Name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            type="password"
            name="password_confirmation"
            label="Retype Password"
            variant="outlined"
            value={formData.password_confirmation}
            onChange={handleChange}
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation}
          />
          <TextField
            select
            name="role"
            label="Role (User or Admin)"
            variant="outlined"
            value={formData.role}
            onChange={handleChange}
            error={!!errors.role}
            helperText={errors.role}
          >
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
          <TextField
            type="date"
            name="dob"
            variant="outlined"
            value={formData.dob}
            onChange={handleChange}
            error={!!errors.dob}
            helperText={errors.dob}
          />
          <Button type="submit" variant="contained" color="primary">Register</Button>
        </form>
        <Link to="/" style={{ display: 'block', textAlign: 'center', marginTop: '20px', textDecoration: 'none' }}>
          <Button variant="outlined" color="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default Register;

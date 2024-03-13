// components/Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, MenuItem, Typography } from '@mui/material';

// Import your default avatar image
import defaultAvatar from '../assets/profile.png';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', retypePassword: '', role: '', dob: '', avatar: defaultAvatar });
  const [errors, setErrors] = useState({});

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
      case 'retypePassword':
        newErrors.retypePassword = value === formData.password ? '' : 'Passwords do not match';
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

  const handleSubmit = (e) => {
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
    if (!formData.retypePassword) {
      newErrors.retypePassword = 'Please retype the password';
    }
    if (formData.password !== formData.retypePassword) {
      newErrors.retypePassword = 'Passwords do not match';
    }
    if (!formData.role) {
      newErrors.role = 'Select user role'
    }
    if (!formData.dob) {
      newErrors.dob = 'Date of Birth is required'
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Proceed with registration
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h2>Register</h2>
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
            name="retypePassword"
            label="Retype Password"
            variant="outlined"
            value={formData.retypePassword}
            onChange={handleChange}
            error={!!errors.retypePassword}
            helperText={errors.retypePassword}
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
            label="Date of Birth"
            variant="outlined"
            value={formData.dob}
            onChange={handleChange}
            error={!!errors.dob}
            helperText={errors.dob}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={formData.avatar} alt="Avatar" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <Typography variant="body1">{formData.avatar ? formData.avatar.split('/').pop() : 'No image selected'}</Typography>
          </div>
          <input type="hidden" name="avatar" value={formData.avatar} />
          <Button type="submit" variant="contained" color="primary">Register</Button>
        </form>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default Register;

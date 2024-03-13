// components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, MenuItem } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    if (!formData.role) {
      errors.role = 'Role is required';
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Proceed with login
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
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
            select
            name="role"
            label="Role"
            variant="outlined"
            value={formData.role}
            onChange={handleChange}
            error={!!errors.role}
            helperText={errors.role}
          >
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary">Login</Button>
        </form>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default Login;

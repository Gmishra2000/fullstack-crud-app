import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useApiCall } from '../custom-hooks/useAPiCall';
import authService from '../services/apiService.js';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { makeApiCall, isLoading, error } = useApiCall();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
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

    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const email = formData.email;
      const password = formData.password;
      try {
        const result = await makeApiCall(authService.login, { email, password });
        localStorage.setItem('token', result.access_token);
        toast.success(result.message);
        if (result.role === "ADMIN") {
          navigate('/admin');
        } else if (result.role === "USER") {
          navigate('/user');
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h2 style={{textAlign:'center', marginBottom:'20px'}}>Login</h2>
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
          <Button type="submit" variant="contained" color="primary">Login</Button>
        </form>
        <Link to="/" style={{ display: 'block', textAlign: 'center', marginTop: '20px', textDecoration: 'none' }}>
          <Button variant="outlined" color="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default Login;

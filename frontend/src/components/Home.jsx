// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Welcome to My App</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">Login</Button>
        </Link>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary">Register</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;

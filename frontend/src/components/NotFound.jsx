import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" component="p">
        The page you are looking for does not exist.
      </Typography>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Go to Home Page
        </Button>
      </Link>
    </Box>
  );
}

export default NotFound;

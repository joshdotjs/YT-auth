import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('loggedIn') === 'true' ? localStorage.getItem('username') : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      setSuccess('');
      return;
    }
    setError('');
    setSuccess('');
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSuccess('User logged in!');
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        setLoggedInUser(username);
        setUsername('');
        setPassword('');
      } else {
        setError(data.message || 'Login failed.');
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        setLoggedInUser('');
      }
    } catch {
      setError('Network error. Please try again.');
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('username');
      setLoggedInUser('');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f5f5f5' }}>
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Login
        </Typography>
        {loggedInUser && (
          <Typography color="primary" variant="body1" align="center" sx={{ mb: 2 }}>
            Logged in as: {loggedInUser}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="primary" variant="body2" sx={{ mt: 1 }}>
              {success}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login; 
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for login logic
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    setError('');
    // TODO: Add authentication logic here
    alert(`Logging in with: ${username}`);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f5f5f5' }}>
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Login
        </Typography>
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login; 
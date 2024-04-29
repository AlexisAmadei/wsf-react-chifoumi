import './styles/Register.css'
import React, { useContext, useState } from 'react'

import { AuthContext } from '../contexts/Auth'
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

export default function Register() {
  const { userConnected, actions } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    } else {
      try {
        await actions.registerUser({ username, password });
        // timeout to notify user of successful registration
        setError('User registered successfully ! Redirecting to login page...');
        setTimeout(() => {
          navigate('/security/login');
        }, 2000);
      } catch (error) {
        setError(error.message);
      }
    }
  }
  return (
    <div className="register-wrapper">
      {/* <h1>Register</h1> */}
      <form onSubmit={handleSubmit}>
        <p onClick={() => navigate('/')} style={{margin:'0', padding:'0', textAlign:'left', cursor:'pointer', width:'fit-content'}}>&larr; Retour</p>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          type="text"
          name="username"
          required
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          required
        />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          name="confirmPassword"
          required
        />
        <Button type="submit" variant="contained">Register</Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

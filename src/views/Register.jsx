import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/Auth'
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import './styles/Register.css'
import TextInput from '../components/TextInput/TextInput';

export default function Register() {
  const { actions } = useContext(AuthContext);
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
      <form onSubmit={handleSubmit}>
        <p onClick={() => navigate('/')} style={{margin:'0', padding:'0', textAlign:'left', cursor:'pointer', width:'fit-content'}}>&larr; Retour</p>
        <TextInput
          type='text'
          required={true}
          title="username"
          name="username"
          placeholder="Username"
        />
        <TextInput
          type="password"
          required={true}
          title="password"
          name="password"
          placeholder="Password"
        />
        <TextInput
          type="password"
          required={true}
          title="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <Button type="submit" variant="contained" classes={{ root:'login-button'}}>Register</Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/Auth'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material';
import './styles/Login.css'

export default function Login() {
  const { actions } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value
    const password = e.target.password.value
    try {
      await actions.loginUser({ username, password });
      navigate('/private/homepage')
      setError(null)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='login-wrapper'>
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
        <Button type="submit" variant="contained">Login</Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

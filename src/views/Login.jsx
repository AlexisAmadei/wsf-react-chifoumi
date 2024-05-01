import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/Auth'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import './styles/Login.css'
import TextInput from '../components/TextInput/TextInput';

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
        <p onClick={() => navigate('/')} style={{ margin: '0', padding: '0', textAlign: 'left', cursor: 'pointer', width: 'fit-content' }}>&larr; Retour</p>
        <TextInput
          type='text'
          required={true}
          title="username"
          name="username"
          placeholder="Username"
          autoComplete={'off'}
        />
        <TextInput
          type="password"
          required={true}
          title="password"
          name="password"
          placeholder="Password"
        />
        <Button type="submit" variant="contained" className='mui-button'
          classes={{ root: 'login-button' }}>Login</Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

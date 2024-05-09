import './styles/Login.css'
import TextInput from '../components/TextInput/TextInput';

import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/Auth'
import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ReplayIcon from '@mui/icons-material/Replay';

export default function Login() {
  const { actions } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value
    const password = e.target.password.value
    setLoading(true)
    try {
      await actions.loginUser({ username, password });
      setError(null);
      navigate('/private/homepage');
    } catch (error) {
      setIsError(true);
      setLoading(false);
      setError(error.message);
    }
  }

  function handleReload(e) {
    e.preventDefault();
    setIsError(false);
    setError(null);
    setLoading(false);
  }

  return (
    <div className='login-wrapper'>
      {loading && (
        <CircularProgress
          color='secondary'
          size={50}
        />
      )}
      {isError && (
        <div className='error-display'>
          <ErrorOutlineIcon
            color='error'
            fontSize='large'
          />
          {error && <p>{error}</p>}
          <p id='try-again' onClick={handleReload}>Try again
            <ReplayIcon />
          </p>
        </div>
      )}
      {!loading && !isError && (
      <form onSubmit={handleSubmit}>
        <p onClick={() => navigate('/')} style={{ margin: '0', padding: '0', textAlign: 'left', cursor: 'pointer', width: 'fit-content', fontSize:'20px' }}>&larr; Retour</p>
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
      )}
    </div>
  )
}

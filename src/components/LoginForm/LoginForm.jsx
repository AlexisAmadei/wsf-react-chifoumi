import React from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../TextInput/TextInput';
import Button from '@mui/material/Button';

export default function LoginForm({ onSubmit }) {
  const navigate = useNavigate();

  return (
    <form onSubmit={onSubmit}>
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
  );
}
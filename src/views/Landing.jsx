import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function landing() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1>
      <button title='register' onClick={() => navigate('security/register')}>register</button>
      <button title='login' onClick={() => navigate('security/login')}>login</button>
    </div>
  )
}

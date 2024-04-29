import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Landing.css'

export default function landing() {
  const navigate = useNavigate();

  return (
    <div className='landing-wrapper'>
      <h1>{`Shi{Foo}Feuille`}</h1>
      <div className='button-container'>
        <button title='register' onClick={() => navigate('security/register')}>Register</button>
        <button title='login' onClick={() => navigate('security/login')}>Login</button>
      </div>
    </div>
  )
}

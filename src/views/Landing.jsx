import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Landing.css'

export default function landing() {
  const navigate = useNavigate();
  const exResp = {
    _id: 'd6bb94d2-01c0-4b1e-b739-7f15145160ad',
    username: 'alexisamadei',
    password: 'aled',
    __v: 0
  };
  console.log(JSON.stringify(exResp._id));

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

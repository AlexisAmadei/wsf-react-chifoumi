import React from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div>
      <h1>Home</h1>
      <button title='register' onClick={() => navigate('security/register')}>register</button>
      <button title='login' onClick={() => navigate('security/login')}>login</button>
    </div>
  )
}

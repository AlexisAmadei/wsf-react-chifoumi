import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/Auth'
import { useNavigate } from 'react-router-dom'
import Homepage from './Homepage'

export default function Login() {
  const { userConnected, actions } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value
    const password = e.target.password.value


    console.log(username, password)

    try {
      await actions.loginUser({ username, password });
      navigate('/private/homepage')
      setError(null)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' name='username' placeholder='username' />
        <input type='password' name='password' placeholder='password' />
        <button type='submit'>Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

import React, { useContext, useState } from 'react'

import { AuthContext } from '../contexts/Auth'

export default function Register() {
  const { userConnected, actions } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password !== confirmPassword) {
      console.error('Passwords do not match')
      return;
    } else {
      try {
        await actions.registerUser({ username, password });
      } catch (error) {
        setError(error.message);
      }
    }
  }
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <input type='password' name='confirmPassword' placeholder='Confirm Password' />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}
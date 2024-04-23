import React from 'react'

export default function Register() {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <input type='password' name='confirmPassword' placeholder='Confirm Password' />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

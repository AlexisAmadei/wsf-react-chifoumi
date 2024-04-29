import React, { useContext } from 'react'
import './AppBar.css'
import { AuthContext } from '../../contexts/Auth'


export default function AppBar() {
  const { actions } = useContext(AuthContext);

  function handleLogout() {
    actions.logoutUser();
    console.log('User logged out.');
  }
  return (
    <div className="appBar">
      <h1>Chifoufeuille</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

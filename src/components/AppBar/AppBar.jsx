import React, { useContext } from 'react'
import './AppBar.css'
import { AuthContext } from '../../contexts/Auth'
import { useNavigate } from 'react-router-dom'

export default function AppBar() {
  const { actions } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleLogout() {
    actions.logoutUser();
    console.log('User logged out.');
  }
  function goHome() {
    navigate('/private/homepage');
  }
  return (
    <div className="appBar">
      <h1 onClick={() => goHome()} style={{ cursor: 'pointer' }}>Shi<span style={{ color: '#646cff', fontStyle: 'normal' }}>{`{Foo}`}</span>Feuille</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

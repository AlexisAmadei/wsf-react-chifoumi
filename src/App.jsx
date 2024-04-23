import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Landing from './views/Landing'
import Register from './views/Register'
import Login from './views/Login'
import AuthProvider from './contexts/Auth'

import Security from './layouts/Security'
import Private from './layouts/Private'

function App() {
  // if (user === null) return <Loading />;
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/security" element={<Security />} >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path='/private' element={<Private />} >
          <Route path='*' element={<div>Private</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
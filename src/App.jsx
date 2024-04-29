import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './views/Landing'
import Register from './views/Register'
import Login from './views/Login'
import Homepage from './views/Homepage'
import Security from './layouts/Security'
import Private from './layouts/Private'
import AuthProvider from './contexts/Auth'
import './styles/App.css'

function App() {
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
            <Route path='homepage' element={<Homepage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
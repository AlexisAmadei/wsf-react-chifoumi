import './styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './views/Landing'
import Register from './views/Register'
import Login from './views/Login'
import Homepage from './views/Homepage'
import Security from './layouts/Security'
import Private from './layouts/Private'
import MatchView from './views/MatchView'
import MatchLayout from './layouts/MatchLayout'
import AuthProvider from './contexts/Auth'

function App() {
  return (
    <div className='app-wrapper'>
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
              <Route path='match' element={<MatchLayout opponent />}>
                <Route path=':matchId' element={<MatchView />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </div>
  )
}

export default App
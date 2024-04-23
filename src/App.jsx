import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app-wrapper'>
      <button title='login' >Login</button>
      <button title='register' >Register</button>
    </div>
  )
}

export default App

import React, { createContext, useState } from 'react'
import { registerUser } from '../services/UserBackend';

export const AuthContext = createContext();
export default function Auth({ children }) {
  const [userConnected, setUserConnected] = useState({
    id: '',
    username: '',
    password: ''
  });
  const actions = {
    async registerUser(user) {
      const newUser = await registerUser(user);
      setUserConnected({
        id: newUser.id,
        username: newUser.username,
        password: newUser.password
      });
      localStorage.setItem('userConnected', JSON.stringify(newUser));
    }
  }
  return (
    <AuthContext.Provider value={{ userConnected, actions }}>
      {children}
    </AuthContext.Provider>
  )
}

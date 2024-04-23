import React, { createContext, useState } from 'react'
import { registerUser } from '../services/UserBackend';

export const AuthContext = createContext();
export default function Auth({ children }) {
  const [userConnected, setUserConnected] = useState({
    id: 1,
    username: '',
    password: ''
  });
  const actions = {
    async registerUser(user) {
      const newUser = await registerUser(user);
      setUserConnected((data) => ({
        id: newUser.id,
        username: newUser.username,
        password: newUser.password
      }));
    }
  }
  return (
    <AuthContext.Provider>
      {children}
    </AuthContext.Provider>
  )
}

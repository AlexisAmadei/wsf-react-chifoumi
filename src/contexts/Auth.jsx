import React, { createContext, useState } from 'react'
import { loginUser, registerUser } from '../services/UserBackend';

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
    },
    async loginUser({ username, password }) {
      const login = await loginUser({ username, password });
      setUserConnected((prevState) => ({
        ...prevState,
        token: login.token,
        username: username,
      }));
      localStorage.setItem('userConnected', JSON.stringify({
        token: login.token,
        username: username,
      }));
    }
  }
  return (
    <AuthContext.Provider value={{ userConnected, actions }}>
      {children}
    </AuthContext.Provider>
  )
}

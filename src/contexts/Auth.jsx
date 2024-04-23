import React, { createContext, useState } from 'react'
import { loginUser, registerUser } from '../services/UserBackend';

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
    },

    async loginUser({username, password}) {
      const login = await loginUser({username, password});
      setUserConnected(({
        token: login.token
      }));
    }
  }
  return (
    <AuthContext.Provider value={{userConnected, actions}}>
      {children}
    </AuthContext.Provider>
  )
}

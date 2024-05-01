import React, { createContext, useState } from 'react'

export const MatchContext = createContext();
export default function Match({ matchId, children }) {
  return (
    <MatchContext.Provider value={{ matchId }}>
      {children}
    </MatchContext.Provider>
  )
}

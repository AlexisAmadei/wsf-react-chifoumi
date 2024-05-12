import React, { createContext, useState } from 'react';
import { refreshMatch } from '../services/MatchesBackend';

export const MatchContext = createContext();
export default function Match({ matchId, children }) {
  const actions = {
    async refreshMatch(matchId) {
      const match = await refreshMatch(matchId);
      return match;
    },
  }
  return (
    <MatchContext.Provider value={{ matchId, actions }}>
      {children}
    </MatchContext.Provider>
  )
}

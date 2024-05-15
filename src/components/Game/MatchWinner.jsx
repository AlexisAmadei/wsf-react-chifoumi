import React from 'react'

export default function MatchWinner({ winner, onNavigate }) {
  return (
    (winner !== null || winner !== undefined) && (
      <div className='match-winner'>
        {winner}
        <button type='button' onClick={onNavigate}>Home</button>
      </div>
    )
  );
}
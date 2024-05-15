import React from 'react'

export default function TurnHistory({ turns, players }) {
  return (
    <div className='turn-history'>
      <h2>Turns history</h2>
      <ol>
        {turns.length > 0 && turns.map((turn, index) => (
          <React.Fragment key={index}>
            <li>
              {index !== turns.length - 1 && <hr />}
              <h1 style={{ textAlign: 'center' }}>Turn {index + 1}</h1>
              <p>Player 1: {players.player1} played: {turn.user1}</p>
              <p>Player 2: {players.player2} played: {turn.user2}</p>
            </li>
          </React.Fragment>
        ))}
      </ol>
    </div>
  );
}

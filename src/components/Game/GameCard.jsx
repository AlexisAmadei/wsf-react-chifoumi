import React from 'react'

export default function GameCard({ type, selected, isSelectable, onSelect }) {
  return (
    <div className={`game-card ${type} ${selected === type ? 'selected' : ''}  ${isSelectable === true ? 'selectable' : ''} `} onClick={() => onSelect(type)}>
      <p>{type === 'rock' ? '🪨' : type === 'paper' ? '🍁' : '✂️'}</p>
    </div>
  );
}

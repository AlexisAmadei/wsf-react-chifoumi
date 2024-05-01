import React from 'react';
import './TextInput.css';

export default function TextInput({ type, required, title, name, placeholder }: {
  type: string,
  required: boolean,
  title: string,
  name: string,
  placeholder: string,
}) {
  return (
    <div className="inputbox">
      <input type={type} required={required} title={title} name={name} autoComplete='off' />
      <span>{placeholder}</span>
      <i></i>
    </div>
  )
}
import React from 'react';
import './index.css';

type InputProps = {
  label: string;
} & React.ComponentProps<'input'>;

export function Input({ label, id, ...props }: InputProps) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} className="input-field" {...props} />
    </div>
  );
}
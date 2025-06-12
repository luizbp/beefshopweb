import React from 'react';
import './index.css';

type SelectProps = {
  label: string;
  options: readonly string[];
} & React.ComponentProps<'select'>;

export function Select({ label, id, options, ...props }: SelectProps) {
  return (
    <div className="select-group">
      <label htmlFor={id}>{label}</label>
      <select id={id} className="select-field" {...props}>
        <option value="" disabled>Selecione...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
import React from 'react';

export const Button = ({ children, className, onClick }) => (
  <button
    className={`px-4 py-2 rounded ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

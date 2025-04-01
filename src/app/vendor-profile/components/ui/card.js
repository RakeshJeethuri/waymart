import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`p-4 rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="mb-2">
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-lg font-bold">
    {children}
  </h2>
);

export const CardContent = ({ children }) => (
  <div>
    {children}
  </div>
);

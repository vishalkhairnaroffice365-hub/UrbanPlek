import React from 'react';

export const InputGroup = ({ label, children, className = '' }) => (
  <div className={className}>
    <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
    {children}
  </div>
);

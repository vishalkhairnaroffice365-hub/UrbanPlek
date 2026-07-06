import React from 'react';
import { Icon } from './Icon';

export const Chip = ({ label, selected, onClick, icon: IconComponent }) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 rounded-lg border font-bold transition-all duration-200 flex items-center gap-2 text-sm
      ${selected 
        ? 'border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)] shadow-sm scale-[1.02]' 
        : 'border-slate-200 text-slate-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] bg-white'
      }
    `}
  >
    {IconComponent && <IconComponent className={selected ? 'text-[var(--color-primary)]' : 'text-slate-400'} />}
    {label}
  </button>
);

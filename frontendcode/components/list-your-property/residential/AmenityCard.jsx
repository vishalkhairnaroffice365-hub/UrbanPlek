import React from 'react';
import { Icon } from './Icon';
import { MdCheck } from 'react-icons/md';

export const AmenityCard = ({ icon: IconComponent, label, selected, onClick }) => (
  <div 
    onClick={onClick}
    className={`
      flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all duration-200 group
      ${selected 
        ? 'bg-blue-50 border-blue-200 shadow-sm' 
        : 'border-slate-100 hover:bg-blue-50/50 hover:border-blue-200 bg-white'
      }
    `}
  >
    <IconComponent className={`text-xl transition-colors ${selected ? 'text-[var(--color-primary)]' : 'text-slate-400 group-hover:text-[var(--color-primary)]'}`} />
    <span className={`text-xs font-medium ${selected ? 'text-slate-800' : 'text-slate-600'}`}>{label}</span>
    {selected && <MdCheck className="ml-auto text-[var(--color-primary)] text-sm" />}
  </div>
);

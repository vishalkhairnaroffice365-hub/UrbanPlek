import React from 'react';
import { Icon } from './Icon';

export const SectionTitle = ({ icon: IconComponent, title }) => (
  <div className="flex items-center gap-2 mb-4">
    <IconComponent className="text-[var(--color-primary)] text-xl" />
    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
  </div>
);

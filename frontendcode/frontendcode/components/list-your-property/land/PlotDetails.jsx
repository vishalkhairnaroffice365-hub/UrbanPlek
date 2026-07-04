import React from 'react';
import { MdArchitecture } from 'react-icons/md';
import { SectionTitle } from '../residential/SectionTitle';
import { InputGroup } from '../residential/InputGroup';
import { Chip } from '../residential/Chip';

const FACING_OPTIONS = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];

export const PlotDetails = ({ formData, handleInputChange }) => {
  return (
    <section id="plot-details" className="scroll-mt-28 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <SectionTitle icon={MdArchitecture} title="Plot Details" />
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="Plot Area (sq.ft.)">
            <input 
              type="number" 
              placeholder="e.g. 1500" 
              className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all font-medium text-sm"
              value={formData.plotArea}
              onChange={(e) => handleInputChange('plotArea', e.target.value)}
            />
          </InputGroup>
          
          <InputGroup label="Dimensions (L x B)">
            <div className="flex gap-2 items-center">
              <input 
                type="number" 
                placeholder="Length" 
                className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all font-medium text-sm"
                value={formData.length}
                onChange={(e) => handleInputChange('length', e.target.value)}
              />
              <span className="text-slate-400">x</span>
              <input 
                type="number" 
                placeholder="Breadth" 
                className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all font-medium text-sm"
                value={formData.breadth}
                onChange={(e) => handleInputChange('breadth', e.target.value)}
              />
            </div>
          </InputGroup>
        </div>

        <div>
          <p className="text-sm font-bold text-slate-700 mb-3">Facing</p>
          <div className="flex flex-wrap gap-2">
            {FACING_OPTIONS.map((opt) => (
              <Chip 
                key={opt} 
                label={opt} 
                selected={formData.facing === opt} 
                onClick={() => handleInputChange('facing', opt)} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
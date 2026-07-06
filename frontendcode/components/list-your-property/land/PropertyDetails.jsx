import React from 'react';
import { MdArchitecture } from 'react-icons/md';
import { SectionTitle } from '../residential/SectionTitle';
import { InputGroup } from '../residential/InputGroup';
import { Chip } from '../residential/Chip';

const FURNISHING_OPTIONS = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'];

export const PropertyDetails = ({ formData, handleInputChange }) => {
  return (
    <section id="property-details" className="scroll-mt-28 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <SectionTitle icon={MdArchitecture} title="Property Details" />
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="Carpet Area (sq.ft.)">
            <input 
              type="number" 
              placeholder="e.g. 850" 
              className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all font-medium text-sm"
              value={formData.carpetArea}
              onChange={(e) => handleInputChange('carpetArea', e.target.value)}
            />
          </InputGroup>
          
          <InputGroup label="Floor Number">
            <input 
              type="number" 
              placeholder="e.g. 2" 
              className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all font-medium text-sm"
              value={formData.floor}
              onChange={(e) => handleInputChange('floor', e.target.value)}
            />
          </InputGroup>

          <InputGroup label="Washrooms">
             <input 
              type="number" 
              placeholder="e.g. 1" 
              className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all font-medium text-sm"
              value={formData.washrooms}
              onChange={(e) => handleInputChange('washrooms', e.target.value)}
            />
          </InputGroup>
        </div>

        <div>
          <p className="text-sm font-bold text-slate-700 mb-3">Furnishing Status</p>
          <div className="flex flex-wrap gap-2">
            {FURNISHING_OPTIONS.map((opt) => (
              <Chip 
                key={opt} 
                label={opt} 
                selected={formData.furnishing === opt} 
                onClick={() => handleInputChange('furnishing', opt)} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { MdArchitecture, MdAdd } from 'react-icons/md';
import { BHK_OPTIONS, FURNISHING_OPTIONS } from '../../../constants/constants';
import { SectionTitle } from './SectionTitle';
import { InputGroup } from './InputGroup';
import { Chip } from './Chip';

export const TechnicalSpecs = ({ formData, handleInputChange }) => {
  return (
    <section id="technical-specs" className="scroll-mt-28 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <SectionTitle icon={MdArchitecture} title="Technical Specs" />
      
      <div className="space-y-6">
        <div>
          <p className="text-sm font-bold text-slate-700 mb-3">Configuration (BHK)</p>
          <div className="flex flex-wrap gap-2">
            {BHK_OPTIONS.map((opt) => (
              <Chip 
                key={opt} 
                label={opt} 
                selected={formData.bhk === opt} 
                onClick={() => handleInputChange('bhk', opt)} 
              />
            ))}
            <button className="px-4 py-2 rounded-lg border border-dashed border-slate-300 font-bold text-slate-500 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-2 bg-slate-50 text-sm">
              <MdAdd className="text-lg" /> Other
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="Super Built-up Area (sq.ft.)">
            <input 
              type="number" 
              placeholder="e.g. 1250" 
              className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all font-medium text-sm"
              value={formData.area}
              onChange={(e) => handleInputChange('area', e.target.value)}
            />
          </InputGroup>
          <InputGroup label="Floor Number">
            <input 
              type="number" 
              placeholder="e.g. 4" 
              className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all font-medium text-sm"
              value={formData.floor}
              onChange={(e) => handleInputChange('floor', e.target.value)}
            />
          </InputGroup>
        </div>

        <div>
          <p className="text-sm font-bold text-slate-700 mb-3">Furnishing Status</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {FURNISHING_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => handleInputChange('furnishing', opt)}
                className={`
                  py-3 rounded-lg border text-center font-bold transition-all duration-200 text-sm
                  ${formData.furnishing === opt 
                    ? 'border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)] shadow-sm' 
                    : 'border-slate-200 text-slate-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] bg-white'
                  }
                `}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
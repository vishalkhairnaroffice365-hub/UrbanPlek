import React from 'react';
import { MdInfoOutline, MdLocationOn } from 'react-icons/md';
import { SectionTitle } from '../residential/SectionTitle';
import { InputGroup } from '../residential/InputGroup';
import { Chip } from '../residential/Chip';

const LAND_TYPES = ['Residential Plot', 'Commercial Plot', 'Agricultural Land', 'Industrial Land'];
const LISTING_TYPES = ['Sell', 'Rent/Lease', 'Joint Venture'];

export const BasicDetails = ({ formData, handleInputChange }) => {
  return (
    <section id="basic-details" className="scroll-mt-28 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <SectionTitle icon={MdInfoOutline} title="Basic Details" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Property Title" className="col-span-2">
          <input 
            type="text" 
            placeholder="e.g. 2000 sq.ft Plot in Gangapur Road" 
            className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all font-medium placeholder:text-slate-400 text-sm"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </InputGroup>

        <InputGroup label="Land Type">
          <select 
            className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all font-medium appearance-none cursor-pointer text-sm"
            value={formData.landType}
            onChange={(e) => handleInputChange('landType', e.target.value)}
          >
            {LAND_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </InputGroup>

        <InputGroup label="I want to">
          <div className="flex gap-2">
            {LISTING_TYPES.map((opt) => (
              <Chip
                key={opt}
                label={opt}
                selected={formData.listingType === opt}
                onClick={() => handleInputChange('listingType', opt)}
              />
            ))}
          </div>
        </InputGroup>

        <InputGroup label="Location" className="col-span-2">
          <div className="relative">
            <MdLocationOn className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input 
              type="text" 
              placeholder="Locality, Village or Survey Number" 
              className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all font-medium placeholder:text-slate-400 text-sm"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>
        </InputGroup>
      </div>
    </section>
  );
};